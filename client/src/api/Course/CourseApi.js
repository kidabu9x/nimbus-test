import Api from '@/api/Api.js'

let adminUrl = '/api/course/admin'

export default {
    // --------------For Admin--------------
    fetchAllCourses () {
        return Api().get(`${adminUrl}`);
    },
    fetchOneCourse (handle) {
        return Api().get(`${adminUrl}/${handle}`);  
    },
    createNewCourse (newCourse) {
        return Api().post(`${adminUrl}`, newCourse);
    }
}