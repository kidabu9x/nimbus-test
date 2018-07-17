import Api from '@/api/Api.js'

export default {
    fetchQuestions () {
      return Api().get('/api/questions')
    },
    createNewQuestion (newQuestion) {
      return Api().post('/api/questions', newQuestion)
    },
    updateQuestion (question) {
      return Api().put('/api/questions/' + question._id, question)
    },
    deleteQuestion (questionId) {
      return Api().delete('/api/questions/' + questionId)
    },
    createExam (module) {
      return Api().get(`/api/questions/${module}`)
    }
}