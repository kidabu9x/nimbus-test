import Api from '@/api/Admin';

let baseUrl = 'courses';

export default {
    fetchCourses (query) {
        return Api().get(`${baseUrl}`, {
            params: query
        });
    },
    fetchOneCourse (handle) {
        return Api().get(`${baseUrl}/${handle}`);  
    },
    updateCourse (course) {
        return Api().put(`${baseUrl}/${course._id}`, course);  
    },
    createNewCourse (newCourse) {
        return Api().post(`${baseUrl}`, newCourse);
    },
}