import Api from '@/api/Api.js';

const adminUrl = '/api/test/admin';

export default {
    // --------------For Admin--------------
    fetchTestClass () {
      return Api().get(`${adminUrl}`);
    },
    createNewTestClass (newTest) {
        return Api().post(`${adminUrl}`, newTest);
    },
    updateTest(keyClass, updateField) {
        return Api().put(`adminUrl/${keyClass}`, updateField);
    },
    deleteTest(id) {
        return Api().delete(`${adminUrl}/${id}`);
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