<template>
  <div class="simple-page">
    <div class="md-layout md-gutter" v-if="currentQuest">
      <div class="md-layout-item md-size-20"></div>
      <div class="md-layout-item md-size-60">
        <div class="md-layout-item md-size-100">
          <p>{{handleContent(currentQuest.content)}}</p>
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
        let response = await QuestApi.createExam(3);
        this.questions = response.data;
        this.currentQuest = this.questions[0];
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
      },
      handleContent (content) {
        console.log(content.includes('https://'));
        if (content.includes('https://')) {
          let rawText = content.match(/\b(https?:\/\/.*?\.[a-z]{2,4}\b)/g);
          console.log(rawText);
        }
        return content;
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
