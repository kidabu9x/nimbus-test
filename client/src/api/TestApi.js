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
    getTestResults (keyClass) {
        return Api().get(`/api/test/admin/${keyClass}`);
    },
    // --------------For User-------------
    checkCode(keyClass) {
        return Api().get(`/api/test/${keyClass}`);
    },
    updateNewAnswer(keyClass, username, module, totalCorrect, answers) {
        Api().put(`/api/test/${keyClass}`, {
            username: username,
            module: module,
            total_correct: totalCorrect,
            answers: answers
        })
    }
}