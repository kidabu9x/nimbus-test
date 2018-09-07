import Api from '@/api/Api.js'

let adminUrl = '/api/grade/admin'

export default {
    // --------------For Admin--------------
    fetchAllGrades (courseId) {
        return Api().get(`${adminUrl}/${courseId}`);
    },
    createNewGrade (newGrade) {
        return Api().post(`${adminUrl}`, newGrade);
    },
    countGrades (courseId) {
        return Api().get(`${adminUrl}/${courseId}/count`);
    }
}