import Api from '@/api/User';

let baseUrl = 'questions';

export default {
    createExam (module) {
      return Api().get(`${baseUrl}/${module}`)
    },
    checkQuest (quest) {
      return Api().post(`${baseUrl}/${quest._id}`, quest);
    }
}