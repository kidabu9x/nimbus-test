import Api from '@/api/Api.js'

export default {
    fetchTest () {
      return Api().get('/api/test')
    }
}