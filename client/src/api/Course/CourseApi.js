import Api from '@/api/Api.js'

let adminUrl = '/api/course/admin'

export default {
    // --------------For Admin--------------
    fetchCourses (query) {
        if (query) {
            return Api().get(`${adminUrl}`, {
                params: query
            });
        } else {
            return Api().get(`${adminUrl}`);
        }
    },
    fetchOneCourse (handle) {
        return Api().get(`${adminUrl}/${handle}`);  
    },
    updateCourse (course) {
        return Api().put(`${adminUrl}`, course);  
    },
    createNewCourse (newCourse) {
        return Api().post(`${adminUrl}`, newCourse);
    }
}