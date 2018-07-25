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
        <div v-else>
            <md-toolbar md-elevation="1" style="position: fixed; background-color: #26c6da;">
                <div class="md-layout md-gutter" style="width: 100%;">
                    <div class="md-layout-item">
                        <h3 class="md-title" style="color: #fff;">{{settings.name}} - Module {{settings.module}}</h3>
                    </div>
                    <div class="md-layout-item">
                        <h3 class="md-title" style="color: #fff; text-align: center;">{{username}}</h3>
                    </div>
                    <div class="md-layout-item">
                        <countdown :time="settings.time*60*1000" :auto-start="false" ref="countdown">
                            <template slot-scope="props">
                                <h3 class="md-title" style="color: #fff; text-align: right;">
                                    {{ props.minutes }} : {{ props.seconds }}
                                </h3>
                            </template>
                        </countdown>
                    </div>
                </div>
            </md-toolbar>
            <div class="md-layout md-gutter" style="padding-top: 64px;">
                <div class="md-layout-item md-size-25" style="position: relative;">
                    <div style="position: fixed; top: 30%; text-align: center; display: block; margin-left: 10px;">
                        <h3 v-if="isSubmited" style="text-align: left;">
                            Số câu trả lời đúng: <span style="color: #66bb6a">{{totalCorrect}}</span>/{{testQuests.length}}
                        </h3>
                        <h3 v-if="isSubmited" style="text-align: left;">
                            Tổng số điểm: <span style="color: #66bb6a">{{Math.floor(totalCorrect*pointPerQuest)}}</span>/1000
                        </h3>
                        <div v-if="isSubmitting">
                            <hollow-dots-spinner
                                :animation-duration="1000"
                                :dot-size="15"
                                :dots-num="3"
                                color="#e74c3c"
                                style="margin-left: 40%;"
                            />
                        </div>
                    </div>
                </div>
                <div class="md-layout-item md-size-50">
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100">
                            <md-card v-for="(question, index) in testQuests" :key="question._id" :id="`q_${question._id}`">
                                <md-card-header :class="{'is-testing': !isSubmited, 'is-correct': (question.is_match && isSubmited), 'is-uncorrect': (!question.is_match && isSubmited)}">
                                    <p>Câu {{index + 1}}</p>
                                </md-card-header>

                                <md-card-content>
                                    <div class="md-title">
                                        <h4 style="font-weight: 500;">
                                            <span class='paragraph'>{{question.content}}</span>
                                        </h4>
                                    </div>
                                    <div v-if="question.image" @click="expandImage(question.image)" class="question-image">
                                        <img :src="question.image">
                                    </div>
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
                    <div style="position: fixed; bottom: 5%;" v-if="textNotices.length  > 0 && isSubmited">
                        <md-chip 
                            v-for="notice in textNotices" :key="notice.msg" v-scroll-to="`#q_${notice.id}`" 
                            :style="{'background-color': notice.status ? '#27ae60' : '#ff5252', margin: '5px'}" 
                            class="md-accent" 
                            md-clickable>
                                {{notice.msg}}
                        </md-chip>
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
                        <md-button v-if="code && code.length == 9 && !isCheckingCode" class="md-raised md-primary" style="margin: auto; display: block; margin-top: 20px;" @click="checkCode()">
                            Kiểm tra code
                        </md-button>
                        <div v-if="isCheckingCode">
                            <hollow-dots-spinner
                                :animation-duration="1000"
                                :dot-size="8"
                                :dots-num="3"
                                color="#448AFF"
                                style="margin-left: 40%; margin-top: 20px;"
                            />
                        </div>
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
      isCheckingCode: false,
      stepActive: 'firstStep',
      settings: null,
      textNotices : [],
      showSnackbar : true
    }
  },
  methods: {
    async checkCode() {
        this.isCheckingCode = true;
        const response = await TestApi.checkCode(this.code);
        if (response.data.error) {
            this.noticeError(response.data.error);
            this.isCheckingCode = false;
        } else {
            this.noticeSuccess('Test nào !!!');
            this.settings = response.data;
            this.beginTest();
            this.isCheckingCode = false;
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
      this.pointPerQuest = (1000 / response.data.length);
      this.testQuests = response.data;
      this.creatingExam = false;
      setTimeout(() => {
          this.$refs.countdown.start();
      }, 5*1000);
    },
    async submitResult () {
      this.$refs.countdown.stop();
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
            }
            self.textNotices.push({
                order: index,
                status: quest.is_match,
                msg: `Câu ${index + 1}`,
                id: quest._id
            })
            arr[index] = quest;
            if (index == self.testQuests.length - 1) {
                self.textNotices.sort(function (a,b) {
                    return Number(a.order) - Number(b.order);
                });
                self.isSubmitting = false;
                TestApi.updateNewAnswer(self.code, self.username, self.settings.module, self.totalCorrect, self.testQuests);
            }
          }
      })
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
<style lang="scss">

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

.md-checkbox.md-theme-default.md-checked.checkbox-correct .md-checkbox-container {
    background-color: #27ae60;
    border-color: #27ae60;
}

.question-image {
    cursor: zoom-in;
}

.md-card.md-theme-default {
    margin-top: 30px;
}

.md-card .md-title {
    clear: both;
    padding-top: 10px;
}

.md-card .md-card-header {
    float: left;
    text-align: center;
    font-size: 18px;
    color: #fff;
    margin: -20px 15px 0;
    border-radius: 3px;
    width: 150px;
    padding: 5px 10px;
}

.md-card .md-card-header.is-testing {
    background: linear-gradient(60deg,#26c6da,#00acc1);
    webkit-box-shadow: 0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2);
    box-shadow: 0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2);
}

.md-card .md-card-header.is-correct {
    background: linear-gradient(60deg,#66bb6a,#43a047);
    -webkit-box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);
    box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);
}

.md-card .md-card-header.is-uncorrect {
    background: linear-gradient(60deg,#ef5350,#e53935);
    -webkit-box-shadow: 0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2);
    box-shadow: 0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2);
}
</style>
