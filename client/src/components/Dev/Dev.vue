<template>
  <div class="simple-page">
    <div class="md-layout md-gutter" v-if="currentQuest">
      <div class="md-layout-item md-size-20"></div>
      <div class="md-layout-item md-size-60">
        <div class="md-layout-item md-size-100">
          <p class="paragraph" v-html="handleContent(currentQuest.content)"></p>
        </div>
        <div v-if="currentQuest.answer_type == 'multi_choice'" class="md-layout-item md-size-100">
          <div v-for="ans in currentQuest.answers" :key="ans.id" class="md-layout-item md-size-100">
            <md-checkbox v-model="ans.user_choice">
              <span v-html="handleContent(ans.content)" class="paragraph"></span>
            </md-checkbox>
          </div>
        </div>
        <div v-else-if="currentQuest.answer_type == 'drag_drop'" class="md-layout-item md-size-100">
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
        <div class="md-layout-item md-size-100">
          <md-button @click="submitResult">
            Check quest
          </md-button>
        </div>
      </div>
      <div class="md-layout-item md-size-20"></div>
    </div>
  </div>
</template>

<script>
// Api
import QuestApi from "@/api/QuestionApi";

// Drag and Drop
import { Container, Draggable } from "vue-smooth-dnd";

// External plugins
import getUrls from "get-urls";

export default {
  name: 'Dev',
  data () {
    return {
      questions : [],
      currentQuest : null
    }
  },
  mounted () {
    this.fetchQuest();
  },
  methods : {
      async fetchQuest () {
        let response = await QuestApi.createExam(1);
        this.questions = response.data;
        this.currentQuest = this.questions[0];
        console.log(this.currentQuest);
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
      handleContent (content) {
        let matches = getUrls(content);
          if (matches.size > 0) {
            matches.forEach(url => {
            content = content.replace(url, `<img src="${url}"/>`)
          });
        }
        return content;
      },
      submitResult () {
        checkQuest(this.currentQuest);
        async function checkQuest(quest) {
          let response = await QuestApi.checkQuest(quest);
          console.log(response);
          quest.is_match = response.data.is_match;
          quest.answers = response.data.answers;
        }
      }
  },
  components: {
      Container,
      Draggable
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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

.paragraph {
  white-space: pre-wrap;
}
.md-checkbox .md-checkbox-label {
  height: auto;
}
</style>
