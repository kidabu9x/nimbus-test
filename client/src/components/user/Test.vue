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
            <md-toolbar md-elevation="1" style="position: fixed; background-color: #26c6da; min-height: 40px;">
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
                            Tổng số điểm: <span style="color: #66bb6a">{{Math.floor(totalCorrect*(1000/testQuests.length))}}</span>/1000
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
                            <md-card v-if="!showMenuQuests">
                                <md-card-header :class="{'is-testing': !isSubmited, 'is-correct': (currentQuest.is_match && isSubmited), 'is-uncorrect': (!currentQuest.is_match && isSubmited)}">
                                    <p>Câu {{currentIndex + 1}}/{{testQuests.length}}</p>
                                </md-card-header>
                                <md-card-content>
                                    <div>
                                        <md-button class="md-dense md-primary" @click="goToQuest" style="float: right; color: rgb(38, 198, 218);" >
                                            Làm lại
                                        </md-button>
                                    </div>
                                    <div class="md-title">
                                        <h4 style="font-weight: 500;">
                                            <span class='paragraph'>{{currentQuest.content}}</span>
                                        </h4>
                                    </div>
                                    <div v-if="currentQuest.image" @click="expandImage(currentQuest.image)" class="question-image">
                                        <img :src="currentQuest.image">
                                    </div>
                                    <div v-for="answer in currentQuest.answers" :key="answer.label" style="font-size: 18px;" class="md-layout md-gutter">
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
                                    <p class='paragraph' style="color: #e74c3c;" v-if="isSubmited && currentQuest.description">
                                        {{currentQuest.description}}
                                    </p>
                                </md-card-content>
                                <md-card-actions>
                                    <md-button v-if="currentIndex > 0" @click="prevQuest()" class="md-dense" style="width: 130px;">
                                        <md-icon>navigate_before</md-icon>
                                        <span style="line-height: 24px;">Quay lại</span>
                                    </md-button>
                                    <md-button v-if="checkIsInArray(markQuests, currentQuest, '_id')" @click="markQuests.push(currentQuest)" class="md-dense" style="width: 130px;">
                                        <md-icon>bookmark_border</md-icon>
                                        Đánh dấu
                                    </md-button>
                                    <md-button v-else @click="removeFromArray(markQuests, currentQuest, '_id')" class="md-dense" style="background-color: #ffa726; color: #fff; width: 130px;">
                                        <md-icon style="color: #fff;">bookmark</md-icon>
                                        Bỏ đánh dấu
                                    </md-button>
                                    <md-button v-if="currentIndex < testQuests.length - 1" @click="nextQuest();" class="md-dense" style="width: 130px;">
                                        Câu tiếp theo
                                        <md-icon>navigate_next</md-icon>
                                    </md-button>
                                    <md-button v-else-if="(currentIndex == (testQuests.length - 1)) && answeredQuests.length != testQuests.length" @click="pushLastQuestAndShowMenu()" class="md-dense" style="background-color: rgb(38, 198, 218); color: #fff;">
                                        Trình đơn câu hỏi
                                        <md-icon style="color: #fff;">assignment</md-icon>
                                    </md-button>
                                    <md-button v-else @click="showMenuQuests = true" class="md-dense" style="background-color: rgb(38, 198, 218); color: #fff;">
                                        Trình đơn câu hỏi
                                        <md-icon style="color: #fff;">assignment</md-icon>
                                    </md-button>
                                </md-card-actions>
                            </md-card>
                            <md-card v-else>
                                <md-card-content>
                                    <div class="md-layout md-gutter">
                                        <div class="md-layout-item md-size-100" style="border-bottom: 1px solid rgba(0,0,0,0.1)">
                                            <div class="md-layout md-gutter">
                                                <div class="md-layout-item md-size-20">
                                                    <p style="text-align: center;">#</p>
                                                </div>
                                                <div class="md-layout-item md-size-40">
                                                    <p style="text-align: center;">Đánh dấu xem lại</p>
                                                </div>
                                                <div class="md-layout-item md-size-40">
                                                    <p style="text-align: center;">Quay lại câu hỏi</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="md-layout-item md-size-100" v-for="(quest, i) in answeredQuests" :key="quest._id" style="border-bottom: 1px solid rgba(0,0,0,0.02)">
                                            <div class="md-layout md-gutter">
                                                <div class="md-layout-item md-size-20">
                                                    <p style="text-align: center;">{{i + 1}}</p>
                                                </div>
                                                <div class="md-layout-item md-size-40">
                                                    <md-button v-if="!checkIsInArray(markQuests, quest, '_id')" @click="viewAnsweredQuest(i)" class="md-icon-button" style="display: block; margin: auto;">
                                                        <md-icon style="color: #ffa726;">bookmark</md-icon>
                                                        <md-tooltip md-direction="right">Xem lại câu {{i++}}</md-tooltip>
                                                    </md-button>
                                                </div>
                                                <div class="md-layout-item md-size-40">
                                                    <md-button class="md-icon-button" style="display: block; margin: auto;">
                                                        <md-icon>assignment_return</md-icon>
                                                        <md-tooltip md-direction="right">Quay lại câu {{i++}}</md-tooltip>
                                                    </md-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </md-card-content>
                                <md-card-actions>
                                    <md-button>
                                        Chấm điểm
                                    </md-button>
                                </md-card-actions>
                            </md-card>                       
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
      showStepper: true,
      firstStep: false,
      secondStep: false,
      stepActive: 'firstStep',
      inputName: null,
      code: null,
      isCheckingCode: false,
      username: null,
      settings: null,
      creatingExam: false,
      testQuests: [],
    //   Start changes here
      currentQuest: null,
      currentIndex: 0,
      markQuests: [],
      answeredQuests: [],
      showMenuQuests: false,
    //   End changes
      showExpandImage: false,
      isSubmited: false,
      isSubmitting: false,
      totalCorrect: 0,
      currentImage: null,
      textNotices : []
    }
  },
  mounted: function () {
      this.showStepper = false;
      this.code = 'HTq0nFvMV';
      this.checkCode();
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
        // this.username = this.inputName;
        this.username = 'Duong dep trai';
        this.showStepper = false;
        this.creatingExam = true;
        this.createExam();
    },
    async createExam () {
      const response = await QuestionApi.createExam(this.settings.module);
      this.testQuests = response.data;
      this.goToQuest();
      this.creatingExam = false;
      setTimeout(() => {
          this.$refs.countdown.start();
      }, 5*1000);
    },
    checkIsInArray(array, quest,fieldCheck) {
        return !array.some(e => e[fieldCheck] == quest[fieldCheck]);
    },
    removeFromArray (array, quest, fieldRemove) {
        array.splice(array.findIndex(e => e[fieldRemove] == quest[fieldRemove]), 1);
    },
    nextQuest () {
        this.answeredQuests.push(JSON.parse(JSON.stringify(this.currentQuest)));
        this.currentIndex += 1;
        this.goToQuest();
    },
    prevQuest () {
        this.answeredQuests.splice(this.currentIndex - 1, 1);
        this.currentIndex -= 1;
        this.goToQuest();
    },
    goToQuest () {
        this.currentQuest = JSON.parse(JSON.stringify(this.testQuests[this.currentIndex]));
    },
    pushLastQuestAndShowMenu: function () {
        this.answeredQuests.push(JSON.parse(JSON.stringify(this.currentQuest)));
        this.showMenuQuests = true;
    },
    viewAnsweredQuest: function (index) {
        console.log(index);
        console.log(this.answeredQuests[index]);
        // this.showMenuQuests = false;
        // this.currentQuest = this.answeredQuests[index];
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
                // TestApi.updateNewAnswer(self.code, self.username, self.settings.module, self.totalCorrect, self.testQuests);
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
