import Api from '@/api/Admin';

let baseUrl = 'courses';

export default {
    fetchCourses (query) {
        if (query) {
            return Api().get(`${baseUrl}`, {
                params: query
            });
        } else {
            return Api().get(`${baseUrl}`);
        }
    },
    fetchOneCourse (handle) {
        return Api().get(`${baseUrl}/${handle}`);  
    },
    updateCourse (course) {
        return Api().put(`${baseUrl}`, course);  
    },
    createNewCourse (newCourse) {
        return Api().post(`${baseUrl}`, newCourse);
    },
}