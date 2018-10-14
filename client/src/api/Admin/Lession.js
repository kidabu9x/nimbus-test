import Api from '@/api/Admin';

let baseUrl = 'lessions';

export default {
    fetchLessions (query) {
        return Api().get(`${baseUrl}`, {
            params : query
        });
    },
    createNewLession (newLession) {
        return Api().post(`${baseUrl}`, newLession);
    },
    updateLession (lession) {
        return Api().put(`${baseUrl}/${lession._id}`, lession);
    }
}