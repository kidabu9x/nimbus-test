import Api from '@/api/Api.js'

export default {
    countTotalQuestion () {
      return Api().get(`/api/questions/count`)
    },
    fetchQuestions (page, perPage) {
      return Api().get('/api/questions', {
        params : {
          page: page,
          perPage: perPage
        }
      })
    },
    searchContent (searchTerm) {
      return Api().get('/api/questions/search', {
        params : {
          search : searchTerm
        }
      })
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
    },
    checkQuest (quest) {
      return Api().post(`/api/questions/${quest._id}`, quest);
    }
}