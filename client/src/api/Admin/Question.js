import Api from '@/api/Admin.js';

let baseUrl = 'questions';

export default {
    countTotalQuestion (module) {
      if (module && module != 'null') {
        return Api().get(`${baseUrl}/count?module=${module}`);
      } else {
        return Api().get(`${baseUrl}/count`);
      }
    },
    fetchQuestions (page, perPage, module) {
      return Api().get(`${baseUrl}`, {
        params : {
          page: page,
          perPage: perPage,
          module: module && module != 'null' ? module : null
        }
      })
    },
    searchContent (searchTerm) {
      return Api().get(`${baseUrl}/search`, {
        params : {
          search : searchTerm
        }
      })
    },
    createNewQuestion (newQuestion) {
      return Api().post(`${baseUrl}`, newQuestion)
    },
    updateQuestion (question) {
      return Api().put(`${baseUrl}/${question._id}`, question)
    },
    deleteQuestion (questionId) {
      return Api().delete(`${baseUrl}/${questionId}`)
    }
}