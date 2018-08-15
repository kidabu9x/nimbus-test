import Api from '@/api/Api.js'

export default {
    countTotalQuestion (module) {
      if (module && module != 'null') {
        return Api().get(`/api/questions/count?module=${module}`);
      } else {
        return Api().get(`/api/questions/count`);
      }
    },
    fetchQuestions (page, perPage, module) {
      return Api().get('/api/questions', {
        params : {
          page: page,
          perPage: perPage,
          module: module && module != 'null' ? module : null
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