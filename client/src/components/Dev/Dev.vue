<template>
  <div class="simple-page">
    <div class="md-layout md-gutter" v-if="currentQuest">
      <div class="md-layout-item md-size-20"></div>
      <div class="md-layout-item md-size-60">
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <Container
              group-name="drag_drop"
              behaviour="copy"
              :get-child-payload="getPayload"
            >
              <Draggable v-for="drag in currentQuest.answers[0]" :key="drag.id" v-if="drag.type == 'drag_item'">
                <div class="word-box">
                  <p>{{drag.content}}</p>
                </div>
              </Draggable>
            </Container>
          </div>
          <div class="md-layout-item">
            <Container
              group-name="drag_drop"
              @drop="replaceAnswer"
            >
              <Draggable v-for="(drag, index) in currentQuest.answers[2]" :key="index">
                <div class="word-box">
                  <p v-if="drag.content">{{drag.content}}</p>
                  <p v-else>-</p>
                </div>
              </Draggable>
            </Container>
          </div>
          <div class="md-layout-item">
            <div class="word-box" v-for="drop in currentQuest.answers[1]" :key="drop.id" v-if="drop.type == 'drop_target'">
              <p>{{drop.content}}</p>
            </div>
          </div>
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
        let response = await QuestApi.createExam(4);
        this.questions = response.data;
        this.currentQuest = this.questions[0];
        console.log(this.currentQuest);
      },
      getPayload (i) {
        return this.currentQuest.answers[0][i];
      },
      replaceAnswer (result) {
        console.log(result);
        if (result.addedIndex != null && result.payload && this.currentQuest.answers[2].length > result.addedIndex) {
          this.currentQuest.answers[2][result.addedIndex].id = result.payload.id;
          this.currentQuest.answers[2][result.addedIndex].content = result.payload.content;
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
</style>
