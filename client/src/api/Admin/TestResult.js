import Api from '@/api/Admin.js';

const baseUrl = 'test-results';

export default {
    countTestResults (keyClass) {
        return Api().get(`${baseUrl}/${keyClass}/count`);
    },
    getTestResults (keyClass) {
        return Api().get(`${baseUrl}/${keyClass}`);
    },
    getIncorrectAnswers (keyClass, answerId) {
        return Api().get(`${baseUrl}/${keyClass}/results?id=${answerId}`);
    },
    deleteResults (keyClass) {
        return Api().delete(`${baseUrl}/${keyClass}`);
    }
}