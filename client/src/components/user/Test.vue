<template>
  <div class="test md-scrollbar">
    <div v-if="!startTest" class="md-layout-item md-size-100" style="position: fixed; left: 0; top: 0; width: 100vw; height: 100vh; background-color: white; display: flex;">
        <md-card style="margin: auto; width: 450px;">
            <md-card-content class="md-layout md-gutter">
                <div class="md-layout-item md-size-100" style="text-align: center;">
                    <img src="../../assets/nimbus_logo.png" width="100px">
                </div>
                <!-- Check Email -->
                <form v-if="!isNewUser && !user._id && !codeIsMatch" @submit.prevent="validateUser" class="md-layout-item md-size-100">
                    <div class="md-layout-item md-size-100" style="text-align: center;">
                        <h3 style="margin-bottom: 0;">Đăng nhập</h3>
                        <p style="margin-top: 3px;">Với tài khoản tại Nimbus</p>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-field
                            :class="{
                                'md-invalid': emailInValid
                            }"
                        >
                            <label>Email</label>
                            <md-input v-model="user.email" type="email" :readonly="isChecking"></md-input>
                            <span class="md-error">Địa chỉ email không hợp lệ</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <p class="md-subhead">Nếu chưa có tài khoản tại Nimbus, bạn sẽ cần bổ sung thông tin ở bước tiếp theo nhé.</p>
                    </div>
                    <div class="md-layout-item md-size-100" style="text-align: right; margin: 20px 0;">
                        <md-button class="md-raised md-primary md-elevation-0 md-dense" @click="validateUser" :disabled="isChecking">
                            Tiếp theo
                        </md-button>
                    </div>
                </form>
                <!-- Check Email -->
                <form v-if="isNewUser && !user._id && !codeIsMatch" @submit.prevent="validateNewUser" class="md-layout-item md-size-100">
                    <div class="md-layout-item md-size-100" style="text-align: center;">
                        <h3 style="margin-bottom: 0;">Chào mừng</h3>
                        <div style="margin: 10px 0;">
                            <md-chip style=" box-shadow: none; background-color: white; border: 1px solid rgba(0,0,0, .12);">
                                <md-avatar class="md-small" style="padding: 0; margin: -3px 4px 2px -8px;">
                                    <img v-if="!user.avatar_url || user.avatar_url == ''" src="../../assets/img/ava_default.png">
                                    <img v-else :src="user.avatar_url">
                                </md-avatar>
                                {{user.email}}
                            </md-chip>
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item">
                                <md-field
                                    :class="{
                                        'md-invalid': user.first_name.length == 0
                                    }"
                                >
                                    <label>Họ</label>
                                    <md-input v-model="user.first_name" type="text" :readonly="isChecking"></md-input>
                                    <span class="md-error">*Không được để trống</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item">
                                <md-field
                                    :class="{
                                        'md-invalid': user.last_name.length == 0
                                    }"
                                >
                                    <label>Tên</label>
                                    <md-input v-model="user.last_name" type="text" :readonly="isChecking"></md-input>
                                    <span class="md-error">*Không được để trống</span>
                                </md-field>
                            </div>
                        </div>
                        
                    </div>
                    <div class="md-layout-item md-size-100">
                        <p class="md-subhead">Hãy nhập đúng họ, tên đệm và tên của bạn nhé.</p>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item" style="margin: 20px 0;">
                                <md-button class="md-dense" @click="isNewUser = false" :disabled="isChecking">
                                    Nhập lại Email
                                </md-button>
                            </div>
                            <div class="md-layout-item" style="text-align: right; margin: 20px 0;">
                                <md-button class="md-raised md-primary md-elevation-0 md-dense" @click="validateNewUser" :disabled="isChecking">
                                    Tiếp theo
                                </md-button>
                            </div>
                        </div>
                    </div>
                </form>
                <!-- Enter code after user has id -->
                <form v-if="user._id && !codeIsMatch" @submit.prevent="validateCode" class="md-layout-item md-size-100">
                    <div class="md-layout-item md-size-100" style="text-align: center;">
                        <h3 style="margin-bottom: 0;">{{user.first_name}} {{user.last_name}}</h3>
                        <div style="margin: 10px 0;">
                            <md-chip style=" box-shadow: none; background-color: white; border: 1px solid rgba(0,0,0, .12);">
                                <md-avatar class="md-small" style="padding: 0; margin: -3px 4px 2px -8px;">
                                    <img v-if="!user.avatar_url || user.avatar_url == ''" src="../../assets/img/ava_default.png">
                                    <img v-else :src="user.avatar_url">
                                </md-avatar>
                                {{user.email}}
                            </md-chip>
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-field
                            :class="{
                                'md-invalid': codeInvalid
                            }"
                        >
                            <label>Code</label>
                            <md-input v-model="code" type="text" :readonly="isChecking"></md-input>
                            <span class="md-error">{{codeInvalidMessage}}</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <p class="md-subhead">Mã code bao gồm 9 kí tự và được cung cấp bởi Giảng viên/Admin tại Nimbus.</p>
                    </div>
                    <div class="md-layout-item md-size-100" style="text-align: right; margin: 20px 0;">
                        <md-button class="md-raised md-primary md-elevation-0 md-dense" @click="validateCode" :disabled="isChecking">
                            Tiếp theo
                        </md-button>
                    </div>
                </form>
                <!-- Choose module for testing -->
                <div v-if="user._id && codeIsMatch" class="md-layout-item md-size-100">
                    <div class="md-layout-item md-size-100" style="text-align: center;">
                        <h3 style="margin-bottom: 0;">{{user.first_name}} {{user.last_name}}</h3>
                        <div style="margin: 10px 0;">
                            <md-chip style=" box-shadow: none; background-color: white; border: 1px solid rgba(0,0,0, .12);">
                                <md-avatar class="md-small" style="padding: 0; margin: -3px 4px 2px -8px;">
                                    <img v-if="!user.avatar_url || user.avatar_url == ''" src="../../assets/img/ava_default.png">
                                    <img v-else :src="user.avatar_url">
                                </md-avatar>
                                {{user.email}} - {{settings.name}}
                            </md-chip>
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100" style="margin: 20px 0;">
                        <div class="md-layout">
                            <div class="md-layout-item" style="text-align: center;">
                                <md-button @click="module = 1" :style="{ 'border-bottom' : module == 1 ? '1px solid #1f7347' : '' }">
                                    Module 1
                                </md-button>
                            </div>
                            <div class="md-layout-item" style="text-align: center;">
                                <md-button @click="module = 2" :style="{ 'border-bottom' : module == 2 ? '1px solid #1f7347' : '' }" >
                                    Module 2
                                </md-button>
                            </div>
                            <div class="md-layout-item" style="text-align: center;">
                                <md-button @click="module = 3" :style="{ 'border-bottom' : module == 3 ? '1px solid #1f7347' : '' }">
                                    Module 3
                                </md-button>
                            </div>
                        </div>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <p class="md-subhead">Lựa chọn module</p>
                    </div>
                    <div class="md-layout-item md-size-100" style="text-align: right; margin: 20px 0;">
                        <md-button class="md-raised md-primary md-elevation-0 md-dense" @click="beginTest">
                            Tiếp theo
                        </md-button>
                    </div>
                </div>
            </md-card-content>
            <md-progress-bar md-mode="indeterminate" v-if="isChecking" />
        </md-card>
    </div>
    <div v-if="startTest">
        <div class="loading" v-if="creatingExam">
            <breeding-rhombus-spinner
                :animation-duration="2000"
                :size="65"
                color="#e74c3c"
            />
        </div>
        <div v-else>
            <md-toolbar md-elevation="1" style="min-height: 40px;">
                <div class="md-layout md-gutter" style="width: 100%;">
                    <div class="md-layout-item">
                        <h3 v-if="settings != null" class="md-title"  style="line-height: 51px;">{{settings.name}} - Module {{module}}</h3>
                    </div>
                    <div class="md-layout-item" style="text-align: center;">
                        <countdown :time="settings.time*60*1000" :auto-start="false" ref="countdown">
                            <template slot-scope="props">
                                <h3 class="md-title" style="line-height: 51px;">
                                    {{ props.minutes }} : {{ props.seconds }}
                                </h3>
                            </template>
                        </countdown>
                    </div>
                    <div class="md-layout-item" style="text-align: right;">
                        <p>
                            <md-avatar class="md-small" style="padding: 0; margin: -3px 4px 2px -8px;">
                                <img v-if="!user.avatar_url || user.avatar_url == ''" src="../../assets/img/ava_default.png">
                                <img v-else :src="user.avatar_url">
                            </md-avatar>
                            {{user.first_name}} {{user.last_name}}
                        </p>
                    </div>
                </div>
            </md-toolbar>
            <div class="md-layout md-gutter" style="padding-top: 64px;">
                <div class="md-layout-item" style="position: relative;">
                    <div style="position: fixed; top: 30%; text-align: center; display: block; margin-left: 10px;">
                        <h3 v-if="isSubmited" style="text-align: left;">
                            Số câu trả lời đúng: <span style="color: #66bb6a">{{totalCorrect}}</span>/{{testQuests.length}}
                        </h3>
                        <h3 v-if="isSubmited" style="text-align: left;">
                            Tổng số điểm: <span style="color: #66bb6a">{{Math.floor(totalCorrect*(1000/testQuests.length))}}</span>/1000
                        </h3>
                    </div>
                </div>
                <div class="md-layout-item">
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100">
                            <md-card v-if="!showMenuQuests" class="md-card-test">
                                <md-card-header :class="{'is-testing': !isSubmited, 'is-correct': (currentQuest.is_match && isSubmited), 'is-uncorrect': (!currentQuest.is_match && isSubmited)}">
                                    <p>Câu {{currentIndex + 1}}/{{testQuests.length}}</p>
                                </md-card-header>
                                <md-card-content>
                                    <div v-if="!isSubmited">
                                        <md-button class="md-dense md-primary" @click="goToQuest" style="float: right; color: rgb(38, 198, 218);" >
                                            Làm lại
                                        </md-button>
                                    </div>
                                    <div class="md-title">
                                        <h4 style="font-weight: 500;">
                                            <span v-html="handleContent(currentQuest.content)" class='paragraph'></span>
                                        </h4>
                                    </div>
                                    <div v-if="currentQuest.image" @click="expandImage(currentQuest.image)" class="question-image">
                                        <img :src="currentQuest.image">
                                    </div>
                                    <div v-if="currentQuest.answer_type == 'multi_choice'">
                                        <div v-for="answer in currentQuest.answers" :key="answer.id" style="font-size: 18px;" class="md-layout md-gutter">
                                            <div class="md-layout-item md-size-100" v-if="handleContent(answer.content) || answer.include_img">
                                                <md-checkbox v-if="!isSubmited" v-model="answer.user_choice" class="checkbox-default">
                                                    <span v-html="handleContent(answer.content)" class="paragraph"></span>
                                                </md-checkbox>
                                                <div v-else>
                                                    <md-checkbox v-if="answer.user_choice && answer.is_correct" v-model="answer.user_choice" class="checkbox-correct">
                                                        <span v-html="handleContent(answer.content)" class="paragraph"></span>
                                                    </md-checkbox>
                                                    <md-checkbox v-else-if="answer.user_choice && !answer.is_correct" v-model="answer.user_choice">
                                                        <span v-html="handleContent(answer.content)" class="paragraph"></span>
                                                    </md-checkbox>
                                                    <md-checkbox v-else-if="!answer.user_choice && answer.is_correct" v-model="answer.is_correct" class="checkbox-correct">
                                                        <span v-html="handleContent(answer.content)" class="paragraph"></span>
                                                    </md-checkbox>
                                                    <md-checkbox v-else v-model="answer.user_choice">
                                                        <span v-html="handleContent(answer.content)" class="paragraph"></span>
                                                    </md-checkbox>
                                                </div>
                                                <div v-if="answer.include_img && answer.img_url" @click="expandImage(answer.img_url)" class="question-image">
                                                    <img :src="answer.img_url">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="currentQuest.answer_type == 'drag_drop'">
                                        <div class="md-layout md-gutter">
                                            <div class="md-layout-item">
                                                <Container
                                                group-name="drag_drop"
                                                behaviour="copy"
                                                :get-child-payload="getPayload"
                                                >
                                                <Draggable v-for="drag in currentQuest.answers[0]" :key="drag.id">
                                                    <div class="word-box word-box-drag">
                                                        <p v-if="drag.content != null" >{{drag.content}}</p>
                                                        <p v-else>-</p>
                                                    </div>
                                                </Draggable>
                                                </Container>
                                            </div>
                                            <div class="md-layout-item">
                                                <Container
                                                group-name="drag_drop"
                                                @drop="replaceAnswer"
                                                >
                                                <Draggable v-for="(drag, index) in currentQuest.answers[1]" :key="index">
                                                    <div class="word-box">
                                                    <p v-if="drag.content">{{drag.content}}</p>
                                                    <p v-else>-</p>
                                                    </div>
                                                </Draggable>
                                                </Container>
                                            </div>
                                            <div class="md-layout-item">
                                                <div class="word-box" v-for="drop in currentQuest.answers[2]" :key="drop.id">
                                                <p>{{drop.content}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p class='paragraph' style="color: #e74c3c;" v-if="isSubmited && currentQuest.description" v-html="currentQuest.description">
                                    </p>
                                </md-card-content>
                                <md-card-actions>
                                    <md-button v-if="currentIndex > 0 && answeredQuests.length != testQuests.length" @click="prevQuest()" class="md-dense" style="width: 130px;">
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
                                    <md-button v-if="currentIndex < testQuests.length - 1 && answeredQuests.length != testQuests.length" @click="nextQuest();" class="md-dense" style="width: 130px;">
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
                            <md-card v-else class="md-card-test">
                                <md-card-content>
                                    <div class="md-layout md-gutter">
                                        <div class="md-layout-item md-size-100" style="border-bottom: 1px solid rgba(0,0,0,0.1)">
                                            <div class="md-layout md-gutter">
                                                <div class="md-layout-item">
                                                    <p style="text-align: center;">#</p>
                                                </div>
                                                <div class="md-layout-item">
                                                    <p style="text-align: center;">Đánh dấu xem lại</p>
                                                </div>
                                                <div class="md-layout-item">
                                                    <p style="text-align: center;">Quay lại câu hỏi</p>
                                                </div>
                                                <div class="md-layout-item" v-if="isSubmited">
                                                    <p style="text-align: center;">Kết quả</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="md-layout-item md-size-100" v-for="(quest, i) in answeredQuests" :key="quest._id" style="border-bottom: 1px solid rgba(0,0,0,0.02)">
                                            <div class="md-layout md-gutter">
                                                <div class="md-layout-item">
                                                    <p style="text-align: center;">{{i + 1}}</p>
                                                </div>
                                                <div class="md-layout-item">
                                                    <md-button v-if="!checkIsInArray(markQuests, quest, '_id')" @click="viewAnsweredQuest(i)" class="md-icon-button" style="display: block; margin: auto;">
                                                        <md-icon style="color: #ffa726;">bookmark</md-icon>
                                                        <md-tooltip md-direction="right">Xem lại câu {{i + 1}}</md-tooltip>
                                                    </md-button>
                                                </div>
                                                <div class="md-layout-item">
                                                    <md-button class="md-icon-button" @click="viewAnsweredQuest(i)" style="display: block; margin: auto;">
                                                        <md-icon>assignment_return</md-icon>
                                                        <md-tooltip md-direction="right">Quay lại câu {{i + 1}}</md-tooltip>
                                                    </md-button>
                                                </div>
                                                <div class="md-layout-item" v-if="isSubmited">
                                                    <md-button v-if="quest.is_match" class="md-icon-button" style="display: block; margin: auto;" @click="viewAnsweredQuest(i)">
                                                        <md-icon style="color: #66bb6a;">assignment_turned_in</md-icon>
                                                        <md-tooltip md-direction="right">Quay lại câu {{i + 1}}</md-tooltip>
                                                    </md-button>
                                                    <md-button v-else class="md-icon-button" style="display: block; margin: auto;" @click="viewAnsweredQuest(i)">
                                                        <md-icon style="color: #ef5350;">error</md-icon>
                                                        <md-tooltip md-direction="right">Quay lại câu {{i + 1}}</md-tooltip>
                                                    </md-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </md-card-content>
                                <md-card-actions>
                                    <md-button v-if="!isSubmited" @click="submitResult">
                                        Chấm điểm
                                    </md-button>
                                    <div v-if="isSubmitting">
                                        <hollow-dots-spinner
                                            :animation-duration="1000"
                                            :dot-size="15"
                                            :dots-num="3"
                                            color="#e74c3c"
                                            style="margin-left: 40%;"
                                        />
                                    </div>
                                </md-card-actions>
                            </md-card>                       
                        </div>
                        
                    </div>
                </div>
                <div class="md-layout-item" style="position: relative;"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// Api
import TestApi from '@/api/User/Test';
import TestResultApi from '@/api/User/TestResult';
import QuestionApi from '@/api/User/Question';
import MemberApi from '@/api/User/Member';


// Components
import 'epic-spinners/dist/lib/epic-spinners.min.css';
import {BreedingRhombusSpinner, HollowDotsSpinner } from 'epic-spinners/dist/lib/epic-spinners.min.js';
import VueCountdown from '@xkeshi/vue-countdown';
import { Container, Draggable } from "vue-smooth-dnd";

// Plugins
import getUrls from 'get-urls';

export default {
  name: 'Test',
  data () {
    return {
      isChecking: false,
      user: {
        _id: null,
        email: '',
        first_name: '',
        last_name: ''
      },
      emailInValid: false,
      isNewUser : false,
      code: null,
      codeInvalid: false,
      codeInvalidMessage: '',
      codeIsMatch: false,
      settings: null,
      module: null,
      
      startTest: false,
      creatingExam: false,
      
      testQuests: [],
      currentQuest: null,
      currentIndex: 0,
      markQuests: [],
      answeredQuests: [],
      showMenuQuests: false,
      showExpandImage: false,
      isSubmited: false,
      isSubmitting: false,
      totalCorrect: 0,
      currentImage: null
    }
  },
  mounted: function () {
    //   this.showStepper = false;
    //   this.code = 'L2ZHbE4dr';
    //   this.checkCode();
    //   this.beginTest(1)
  },
  methods: {
    async validateUser() {
        if (!this.validateEmail(this.user.email)) {
            this.emailInValid = true;
        } else {
            this.emailInValid = false;
            this.isChecking = true;
            let response = await MemberApi.checkMemberExist(this.user.email);
            if (response.data.is_match) {
                this.user = response.data.member;
            } else {
                this.isNewUser = true;
            }
            this.isChecking = false;
        }
    },
    async validateNewUser () {
        if (this.user.first_name.length > 0 && this.user.last_name.length > 0) {
            this.isChecking = true;
            let response = await MemberApi.createNewMember(this.user);
            this.user = response.data;
            this.isChecking = false;
        }
    },
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    async validateCode () {
        if (this.code.length != 9) {
            this.codeInvalidMessage = 'Mã code phải gồm 9 kí tự';
            this.codeInvalid = true;
        } else {
            this.codeInvalid = false;
            this.isChecking = true;
            let response = await TestApi.checkCode(this.code);
            this.isChecking = false;
            if (response.data.error) {
                this.codeInvalid = true;
                this.codeInvalidMessage = response.data.error;
            } else {
                this.settings = response.data;
                this.isChecking = false;
                this.codeIsMatch = true;
            }
        }
    },
    beginTest () {
        this.creatingExam = true;
        this.startTest = true;
        this.createExam();
    },
    async createExam () {
      const response = await QuestionApi.createExam(this.module);
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
    getPayload (i) {
        return this.currentQuest.answers[0][i];
    },
    replaceAnswer (result) {
        if (result.addedIndex != null && result.payload && this.currentQuest.answers[1].length > result.addedIndex) {
            this.currentQuest.answers[1][result.addedIndex].id = result.payload.id;
            this.currentQuest.answers[1][result.addedIndex].content = result.payload.content;
        }
    },
    pushLastQuestAndShowMenu: function () {
        this.answeredQuests.push(JSON.parse(JSON.stringify(this.currentQuest)));
        this.showMenuQuests = true;
    },
    viewAnsweredQuest: function (index) {
        this.showMenuQuests = false;
        this.currentIndex = index;
        this.currentQuest = this.answeredQuests[index];
    },
    async submitResult () {
      this.$refs.countdown.stop();
      this.isSubmitting = true;
      let self = this;
      let incorrectAnswers = [];
      this.answeredQuests.forEach((quest, index, arr) => {
        checkQuest(quest);
        async function checkQuest(quest) {
            let response = await QuestionApi.checkQuest(quest);
            quest.is_match = response.data.is_match;
            quest.answers = response.data.answers;
            if (quest.is_match) {
                self.totalCorrect += 1;
            } else {
                quest.index = index;
                incorrectAnswers.push(quest);
            }
            arr[index] = quest;
            if (index == self.testQuests.length - 1) {
                self.isSubmitting = false;
                TestResultApi.createNewAnswer(self.code, self.user._id, self.module, self.totalCorrect, self.answeredQuests.length, incorrectAnswers);
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
    handleContent (content) {
        let matches = getUrls(content);
        if (matches.size > 0) {
            matches.forEach(url => {
                content = content.replace(url, `<img src="${url}"/>`)
            });
        }
        return content;
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
    countdown: VueCountdown,
    Container,
    Draggable 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

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

.md-checkbox.md-theme-default.md-checked.checkbox-default .md-checkbox-container {
    background-color:rgb(38, 198, 218);
    border-color: rgb(38, 198, 218);
}

.md-checkbox.md-theme-default.md-checked.checkbox-correct .md-checkbox-container {
    background-color:#66bb6a;
    border-color: #66bb6a;
}

.question-image {
    cursor: zoom-in;
}

.md-card.md-card-test.md-theme-default {
    margin-top: 30px;
}

.md-card.md-card-test .md-title {
    clear: both;
    padding-top: 10px;
}

.md-card.md-card-test .md-card-header {
    float: left;
    text-align: center;
    font-size: 18px;
    color: #fff;
    margin: -20px 15px 0;
    border-radius: 3px;
    width: 150px;
    padding: 5px 10px;
}

.md-card.md-card-test .md-card-header.is-testing {
    background: linear-gradient(60deg,#26c6da,#00acc1);
    webkit-box-shadow: 0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2);
    box-shadow: 0 12px 20px -10px rgba(0,188,212,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(0,188,212,.2);
}

.md-card.md-card-test .md-card-header.is-correct {
    background: linear-gradient(60deg,#66bb6a,#43a047);
    -webkit-box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);
    box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);
}

.md-card.md-card-test .md-card-header.is-uncorrect {
    background: linear-gradient(60deg,#ef5350,#e53935);
    -webkit-box-shadow: 0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2);
    box-shadow: 0 12px 20px -10px rgba(244,67,54,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(244,67,54,.2);
}

.word-box {
  border: 1px solid #678;
  padding: 5px 10px;
  background-color: white;
  margin-right: 5px;
  text-align: center;
  margin: 4px 0;
}
.word-box-drag {
  cursor: all-scroll;
}

.md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
}


</style>
