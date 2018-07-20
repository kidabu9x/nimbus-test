import Api from '@/api/Api.js'

export default {
    // --------------For Admin--------------
    fetchTestClass () {
      return Api().get(`/api/test/admin`);
    },
    createNewTestClass (newTest) {
        return Api().post(`/api/test/admin`, newTest);
    },
    updateTest(keyClass, updateField) {
        return Api().put(`/api/test/admin/${keyClass}`, updateField);
    },

    // --------------For User-------------
    checkCode(keyClass) {
        return Api().get(`/api/test/${keyClass}`);
    },
    createNewAnswer(keyClass, username, totalCorrect, answers) {
        return Api.put(`/api/test/${keyClass}`, {
            username: username,
            total_correct: totalCorrect,
            answers: answers
        })
    }
}