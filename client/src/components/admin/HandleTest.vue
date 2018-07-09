<template>
  <div class="questions">
    <div v-for="q in questions" :key="q.title">
      <p>
        <span><b>{{ q.title }}</b></span><br />
        <span>{{ q.description }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import QuesAction from '@/actions/QuestionApi'
export default {
  name: 'HelloWorld',
  data () {
    return {
        questions: []
    }
  },
  mounted () {
    this.getAllQuestions()
  },
  methods: {
    async getAllQuestions () {
      const response = await QuesAction.fetchQuestions()
      this.questions = response.data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
