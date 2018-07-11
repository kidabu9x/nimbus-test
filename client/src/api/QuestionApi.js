import Api from '@/api/Api.js'

export default {
    fetchQuestions () {
      return Api().get('/api/questions')
    },
    createNewQuestion (newQuestion) {
      return Api().post('/api/questions', newQuestion)
    },
    updateQuestion (question) {
      console.log(question)
      return Api().put('/api/questions/' + question._id, question)
    },
    deleteQuestion (questionId) {
      return Api().delete('/api/questions/' + questionId)
    }
}