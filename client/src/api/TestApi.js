import Api from '@/api/Api.js'

export default {
    fetchTest (module) {
      return Api().get(`/api/test/${module}`);
    }
}