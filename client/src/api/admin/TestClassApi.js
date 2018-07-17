import Api from '@/api/Api.js'

export default {
    fetchTestClass () {
      return Api().get(`/api/admin/test-class`);
    },
    createNewTestClass (newTest) {
        return Api().post(`/api/admin/test-class`, newTest);
    }
}