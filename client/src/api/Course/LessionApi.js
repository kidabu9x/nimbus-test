import Api from '@/api/Api.js'

let adminUrl = 'admin/lession'

export default {
    // --------------For Admin--------------
    fetchLessions (query) {
        return Api().get(`${adminUrl}`, {
            params : query
        });
    },
    createNewLession (newLession) {
        return Api().post(`${adminUrl}`, newLession);
    }
}