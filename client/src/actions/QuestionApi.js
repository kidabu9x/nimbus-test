import Api from '@/actions/Api.js'

export default {
    fetchQuestions () {
      return Api().get('questions')
    }
}