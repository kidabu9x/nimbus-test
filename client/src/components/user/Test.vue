<template>
  <div class="test md-scrollbar">
    <div v-if="username">
        <div class="loading" v-if="creatingExam">
            <breeding-rhombus-spinner
                :animation-duration="2000"
                :size="65"
                color="#e74c3c"
            />
        </div>
        <div v-else class="md-layout md-gutter">
            <div class="md-layout-item md-size-25" style="position: relative;">
                <div style="position: fixed; top: 30%; text-align: center; display: block; margin-left: 10px;">
                    <h3 style="text-align: left;">Lớp : {{settings.name}}</h3>
                    <h3 style="text-align: left;">Học viên : {{username}}</h3>
                    <h3 style="text-align: left;">Module : {{settings.module}}</h3>
                    <h3 v-if="isSubmited" style="text-align: left;">
                        Số câu trả lời đúng: <span style="color: #e74c3c">{{totalCorrect}} / {{testQuests.length}}</span>
                    </h3>
                    <h3 v-if="isSubmited" style="text-align: left;">
                        Tổng số điểm: <span style="color: #e74c3c">{{totalCorrect*pointPerQuest}}/1000</span>
                    </h3>
                    <div v-if="isSubmitting && !isSubmited">
                        <hollow-dots-spinner
                            :animation-duration="1000"
                            :dot-size="15"
                            :dots-num="3"
                            color="#e74c3c"
                            style="margin-left: 40%;"
                        />
                    </div>
                </div>
                <div style="position: fixed; bottom: 5%;">
                    <countdown :time="settings.time*60*1000" :auto-start="false" ref="countdown" @countdownend="submitResult">
                        <template slot-scope="props">
                            Time Remaining：{{ props.minutes }} : {{ props.seconds }}
                        </template>
                    </countdown>
                </div>
            </div>
            <div class="md-layout-item md-size-50">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <md-card v-for="(question, index) in testQuests" :key="question._id" :class="getClass(question)" :id="question._id">
                            <md-card-header>
                                <div class="md-title">
                                    <h4 style="font-weight: 500;">
                                        {{index + 1}}. <span class='paragraph'>{{question.content}}</span>
                                    </h4>
                                </div>
                                <div v-if="question.image" @click="expandImage(question.image)" class="question-image">
                                    <img :src="question.image">
                                </div>
                            </md-card-header>

                            <md-card-content>
                                <div v-for="answer in question.answers" :key="answer.label" style="font-size: 18px;" class="md-layout md-gutter">
                                    <div class="md-layout-item md-size-100">
                                        <md-checkbox v-if="!isSubmited" v-model="answer.user_choice">
                                            {{answer.label}}. <span class="paragraph">{{answer.content}}</span>
                                        </md-checkbox>
                                        <div v-else>
                                            <md-checkbox v-if="answer.user_choice == answer.is_correct" v-model="answer.user_choice" class="checkbox-correct">
                                                {{answer.label}}. <span class="paragraph">{{answer.content}}</span>
                                            </md-checkbox>
                                            <md-checkbox v-else-if="answer.user_choice && !answer.is_correct" v-model="answer.user_choice">
                                                {{answer.label}}. <span class="paragraph">{{answer.content}}</span>
                                            </md-checkbox>
                                            <md-checkbox v-else-if="!answer.user_choice && answer.is_correct" v-model="answer.is_correct" class="checkbox-correct">
                                                {{answer.label}}. <span class="paragraph">{{answer.content}}</span>
                                            </md-checkbox>
                                            <md-checkbox v-else v-model="answer.user_choice">
                                                {{answer.label}}. <span class="paragraph">{{answer.content}}</span>
                                            </md-checkbox>
                                        </div>
                                    </div>
                                </div>
                                <p class='paragraph' style="color: #e74c3c;" v-if="isSubmited && question.description">
                                    {{question.description}}
                                </p>
                            </md-card-content>
                        </md-card>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <div v-if="!isSubmitting && !isSubmited">
                            <md-button style="margin-left: 40%;" class="md-raised md-accent" @click="submitResult">Submit</md-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md-layout-item md-size-25" style="position: relative;">
                <div style="position: fixed; top: 5%;" v-if="textNotices.length  > 0 && isSubmited">
                    <div style="height: 635px; overflow: scroll; width: 150px;">
                        <p v-for="notice in textNotices" :key="notice.msg" style="display: block;cursor: pointer;">
                            <a v-scroll-to="`#${notice.id}`" :style="{color: notice.status ? '#27ae60' : '#ff5252'}">{{notice.msg}}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <md-dialog :md-active.sync="showExpandImage" v-if="currentImage" style="width: 100%;">
      <md-content>
          <img :src="currentImage" style="width: 100%;">
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showExpandImage = false">Đóng</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showStepper" :md-click-outside-to-close="false">
      <md-content style="padding: 25px; width: 600px;">
        <md-steppers :md-active-step.sync="stepActive" md-linear>
            <md-step id="firstStep" md-label="Nhập tên" :md-done.sync="firstStep">
                <md-field>
                    <label>Nhập tên của bạn vào đây nhé ^^</label>
                    <md-input v-model="inputName"></md-input>
                </md-field>
                <md-button style="float: right;" v-if="inputName" class="md-raised md-primary" @click="setDone('firstStep', 'secondStep')">Tiếp tục</md-button>
            </md-step>

            <md-step id="secondStep" md-label="Nhập code" :md-done.sync="secondStep">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                        <md-field>
                            <label>Code</label>
                            <md-input v-model="code"></md-input>
                            <span class="md-helper-text">*Gồm 9 ký tự.</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-button v-if="code && code.length == 9" class="md-raised md-primary" style="margin: auto; display: block; margin-top: 20px;" @click="checkCode()">
                            Kiểm tra code
                        </md-button>
                    </div>
                </div>
            </md-step>

        </md-steppers>
      </md-content>
      
    </md-dialog>
  </div>
</template>

<script>
// Api
import TestApi from '@/api/TestApi';
import QuestionApi from '@/api/QuestionApi';

// Components
import 'epic-spinners/dist/lib/epic-spinners.min.css';
import {BreedingRhombusSpinner, HollowDotsSpinner } from 'epic-spinners/dist/lib/epic-spinners.min.js';
import VueCountdown from '@xkeshi/vue-countdown';

export default {
  name: 'Test',
  data () {
    return {
      creatingExam: false,
      testQuests: [],
      isSubmited: false,
      isSubmitting: false,
      pointPerQuest: 0,
      totalCorrect: 0,
      showExpandImage: false,
      currentImage: null,
      inputName: null,
      username: null,
      showStepper: true,
      firstStep: false,
      secondStep: false,
      code: null,
      stepActive: 'firstStep',
      settings: null,
      textNotices : [],
    }
  },
  methods: {
    async checkCode() {
        const response = await TestApi.checkCode(this.code);
        if (response.data.error) {
            this.noticeError(response.data.error);
        } else {
            this.noticeSuccess('Test nào !!!');
            this.settings = response.data;
            this.beginTest();
        }
    },
    beginTest () {
        this.username = this.inputName
        this.showStepper = false
        this.creatingExam = true
        this.createExam()
    },
    async createExam () {
      const response = await QuestionApi.createExam(this.settings.module);
      this.pointPerQuest = Math.floor(1000 / response.data.length);
      this.testQuests = response.data;
      this.creatingExam = false;
      setTimeout(() => {
          this.$refs.countdown.start();
      }, 5*1000);
    },
    async submitResult () {
      this.isSubmitting = true;
      let self = this;
      this.testQuests.forEach((quest, index, arr) => {
          checkQuest(quest);
          async function checkQuest(quest) {
            let response = await QuestionApi.checkQuest(quest);
            quest.is_match = response.data.is_match;
            quest.answers = response.data.answers;
            if (quest.is_match) {
              self.totalCorrect += 1;
              self.textNotices.push({
                order: index,
                status: true,
                msg: `Câu ${index + 1} : Đúng `,
                id: quest._id
              })
            } else {
              self.textNotices.push({
                order: index,
                status: false,
                msg: `Câu ${index + 1} : Sai `,
                id: quest._id
              })
            }
            arr[index] = quest;
            if (index == self.testQuests.length - 1) {
                self.textNotices.sort(function (a,b) {
                    return Number(a.order) - Number(b.order);
                })
            }
          }
      })
      self.isSubmitting = false;
      self.isSubmited = true;
    },
    getClass (question) {
        if (this.isSubmited) {
            return {
                'is-correct'    : question.is_match,
                'is-uncorrect'  : !question.is_match
            }
        } else {
            return {}
        }
    },
    scrollToQuest(refName) {
        var element = this.$refs[refName];
        console.log(this.$refs[refName]);
        element.scrollTop = element.scrollHeight;
    },
    expandImage (imgUrl) {
        this.currentImage = imgUrl
        this.showExpandImage = true
    },
    setDone (id, index) {
        this[id] = true
        if (index) {
            this.stepActive = index
        }
    },
    noticeError (msg) {
        this.$toasted.show(msg, {
            theme: "bubble", 
            position: "top-right", 
            duration : 5000,
            type: 'error'
        });
    },
    noticeSuccess (msg) {
        this.$toasted.show(msg, {
            theme: "bubble", 
            position: "top-right", 
            duration : 5000,
            type: 'success'
        });
    }
  },
  components: {
    BreedingRhombusSpinner,
    HollowDotsSpinner,
    countdown: VueCountdown
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -100px;
}
.paragraph {
  white-space: pre-wrap;
}
.md-checkbox .md-checkbox-label {
    height: auto;
}
.md-card.md-theme-default {
    margin-top: 5px;
}

.is-correct {
    border: 2px solid #27ae60;
}
.is-uncorrect {
    border: 2px solid #c0392b;
}

.md-checkbox.md-theme-default.md-checked.checkbox-correct .md-checkbox-container {
    background-color: #27ae60;
    border-color: #27ae60;
}

.question-image {
    cursor: zoom-in;
}
</style>
