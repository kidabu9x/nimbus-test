<template>
  <div class="simple-page">
    <div class="md-layout md-gutter" v-if="currentQuest">
        <div class="md-layout-item">
          <Container>
            <Draggable v-for="drag in currentQuest.answers" :key="drag.id" v-if="drag.type == 'drag_item'">
              <div class="draggable-item">
                <p>{{drag.content}}</p>
              </div>
            </Draggable>
          </Container>
        </div>
        <div class="md-layout-item">
          <div v-for="drop in currentQuest.answers" :key="drop.id" v-if="drop.type == 'drop_target'">
            <p>{{drop.content}}</p>
          </div>
        </div>
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
.word {
  border: 1px solid #678;
  padding: 5px 10px;
  background-color: white;
  margin-right: 5px;
}
</style>
