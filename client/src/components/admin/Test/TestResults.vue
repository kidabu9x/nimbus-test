<template>
  <div class="result">
    <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-100">
            <md-card v-for="(question, index) in answers" :key="question._id" :class="getClass(question)" :id="`q_${question._id}`">
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
                    <p class='paragraph' style="color: #e74c3c;" v-if="question.description">
                        {{question.description}}
                    </p>
                </md-card-content>
            </md-card>
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

    
  </div>
</template>

<script>
// Api

// Components

export default {
  name: 'Test',
  props: ['answers'],
  data () {
    return {
      showExpandImage: false,
      currentImage: null
    }
  },
  methods: {
    getClass (question) {
        return {
            'is-correct'    : question.is_match,
            'is-uncorrect'  : !question.is_match
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
