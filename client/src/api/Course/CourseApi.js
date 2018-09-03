import Api from '@/api/Api.js'

let adminUrl = '/api/course/admin'

export default {
    // --------------For Admin--------------
    fetchAllCourses () {
        return Api().get(`${adminUrl}`);
    },
    createNewCourse (newCourse) {
        return Api().post(`${adminUrl}`, newCourse);
    }
}