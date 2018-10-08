<template>
  <div class="result">
    <div class="md-layout">
        <div v-if="isFetching" class="md-layout-item md-size-100" style="text-align: center;">
            <md-progress-spinner class="md-accent" :md-diameter="30" md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-else-if="!isFetching && result && result.incorrect_answers.length == 0" class="md-layout-item md-size-100">
            <md-empty-state
                md-rounded
                md-icon="access_time"
                md-label="Oops...."
                md-description="Không có câu trả lời sai hoặc đáp án đã không được lưu lại"
            >
            </md-empty-state>
        </div>
        <div v-else class="md-layout-item md-size-100">
            <div class="md-layout-item md-size-100">
                <router-link :to="{path: `/admin/tests/${$route.params.handle}`}">
                    <md-button style="color: #637381; text-transform: none;">
                        <md-icon>keyboard_arrow_left</md-icon>
                        Quay lại
                    </md-button>
                </router-link>
            </div>
            <div class="md-layout-item md-size-100">
                <div class="md-layout">
                    <div class="md-layout-item md-size-20"></div>
                    <div class="md-layout-item md-size-60 md-small-size-100">
                        <md-card v-for="answer in result.incorrect_answers" :key="answer._id" class="md-card-test">
                            <md-card-header class="is-uncorrect">
                                <p>Câu {{answer.index + 1}}</p>
                            </md-card-header>
                            <md-card-content>
                                <div class="md-title">
                                    <h4 style="font-weight: 500;">
                                        <span v-html="handleContent(answer.content)" class='paragraph'></span>
                                    </h4>
                                </div>
                                <div v-if="answer.answer_type == 'multi_choice'">
                                    <div v-for="answer in answer.answers" :key="answer.id" style="font-size: 18px;" class="md-layout">
                                        <md-checkbox v-model="answer.user_choice" class="result-checkbox">
                                            <span v-html="handleContent(answer.content)" class="paragraph"></span>
                                        </md-checkbox>
                                    </div>
                                </div>
                                <div v-else-if="answer.answer_type == 'drag_drop'">
                                    <div class="md-layout md-gutter">
                                        <div class="md-layout-item">
                                            <div v-for="drag in answer.answers[0]" :key="drag.id" class="word-box word-box-drag">
                                                <p v-if="drag.content != null" >{{drag.content}}</p>
                                                <p v-else>-</p>
                                            </div>
                                        </div>
                                        <div class="md-layout-item">
                                            <div class="word-box" v-for="(drag, index) in answer.answers[1]" :key="index">
                                                <p v-if="drag.content">{{drag.content}}</p>
                                                <p v-else>-</p>
                                            </div>
                                        </div>
                                        <div class="md-layout-item">
                                            <div class="word-box" v-for="drop in answer.answers[2]" :key="drop.id">
                                                <p>{{drop.content}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class='paragraph' style="color: #e74c3c;" v-html="answer.description"></p>
                            </md-card-content>
                        </md-card>
                    </div>
                    <div class="md-layout-item md-size-20"></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// Api
import TestApi from '@/api/TestApi';
import MemberApi from '@/api/MemberApi';

// Components

// Plugins
import getUrls from 'get-urls';

export default {
  name: 'Test',
  data () {
    return {
      result        : {},
      isFetching    : true,
      currentImage  : null,
    }
  },
  mounted () {
    this.getIncorrectAnswers();
  },
  methods: {
    async getIncorrectAnswers () {
        this.isFetching = true;
        const response = await TestApi.getIncorrectAnswers(this.$route.params.handle, this.$route.params.answerId);
        this.result = response.data;
        this.result.incorrect_answers.sort((e1, e2) => {
            return e1.index - e2.index;
        })
        this.isFetching = false;
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
  },
  components: {
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.paragraph {
  white-space: pre-wrap;
}
.result-checkbox.md-checkbox .md-checkbox-label {
    height: auto;
}

.result-checkbox.md-checkbox.md-theme-default.md-checked.checkbox-default .md-checkbox-container {
    background-color:rgb(38, 198, 218);
    border-color: rgb(38, 198, 218);
}

.result-checkbox.md-checkbox.md-theme-default.md-checked.checkbox-correct .md-checkbox-container {
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
</style>

