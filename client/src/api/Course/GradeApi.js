import Api from '@/api/Api.js'

let adminUrl = '/api/grade/admin'

export default {
    // --------------For Admin--------------
    fetchAllGrades (courseId) {
        return Api().get(`${adminUrl}/${courseId}`);
    },
    createNewCourse (newGrade) {
        return Api().post(`${adminUrl}`, newGrade);
    }
}