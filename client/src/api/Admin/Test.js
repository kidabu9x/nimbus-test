import Api from '@/api/Admin.js';

const baseUrl = 'tests';

export default {
    // --------------For Admin--------------
    fetchTestClass () {
      return Api().get(`${baseUrl}`);
    },
    createNewTestClass (newTest) {
        return Api().post(`${baseUrl}`, newTest);
    },
    updateTest(keyClass, updateField) {
        return Api().put(`${baseUrl}/${keyClass}`, updateField);
    },
    deleteTest(id) {
        return Api().delete(`${baseUrl}/${id}`);
    },
    countTestResults (keyClass) {
        return Api().get(`/api/test-result/admin/${keyClass}/count`);
    },
    getTestResults (keyClass) {
        return Api().get(`/api/test-result/admin/${keyClass}`);
    },
    getIncorrectAnswers (keyClass, answerId) {
        return Api().get(`/api/test-result/admin/${keyClass}/${answerId}`);
    },
    
}