import Api from '@/api/Api.js'

let adminUrl = '/api/class/admin'

export default {
    // --------------For Admin--------------
    fetchClasses (query) {
        return Api().get(`${adminUrl}`, {
            params : query
        });
    },
    createNewClass (newClass) {
        return Api().post(`${adminUrl}`, newClass);
    },
    updateClass (Class) {
        return Api().put(`${adminUrl}`, Class);
    },
    countClass (courseId) {
        return Api().get(`${adminUrl}/${courseId}/count`);
    },
    fetchOneClass (classId) {
        return Api().get(`${adminUrl}/fetch-one/${classId}`);
    }
}