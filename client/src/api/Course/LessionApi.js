import Api from '@/api/Api.js'

let adminUrl = '/api/lession/admin'

export default {
    // --------------For Admin--------------
    fetchAllLessions (gradeId) {
        return Api().get(`${adminUrl}/${gradeId}`);
    },
    createNewLession (newLession) {
        return Api().post(`${adminUrl}`, newLession);
    }
}