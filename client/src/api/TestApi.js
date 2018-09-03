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
    countTestResults (keyClass) {
        return Api().get(`/api/test-result/admin/count/${keyClass}`);
    },
    getTestResults (keyClass) {
        return Api().get(`/api/test-result/admin/${keyClass}`);
    },
    
    // --------------For User-------------
    checkCode(keyClass) {
        return Api().get(`/api/test/${keyClass}`);
    },
    createNewAnswer(keyClass, username, module, totalCorrect, totalQuestions) {
        Api().post(`/api/test-result`, {
            test_code : keyClass,
            username: username,
            module: module,
            total_corrects: totalCorrect,
            total_questions : totalQuestions
        })
    }
}