import Api from '@/api/Admin.js';

let baseUrl = 'classes';

export default {
    // --------------For Admin--------------
    fetchClasses (query) {
        return Api().get(`${baseUrl}`, {
            params : query
        });
    },
    createNewClass (newClass) {
        return Api().post(`${baseUrl}`, newClass);
    },
    updateClass (Class) {
        return Api().put(`${baseUrl}`, Class);
    },
    countClass (courseId) {
        return Api().get(`${baseUrl}/${courseId}/count`);
    },
    fetchOneClass (classId) {
        return Api().get(`${baseUrl}/fetch-one/${classId}`);
    },
    deleteClass (classId) {
        return Api().delete(`${baseUrl}/${classId}`);
    }
}