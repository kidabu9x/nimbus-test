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
    }
}