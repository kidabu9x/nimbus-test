import Api from '@/api/Admin';

let baseUrl = 'rooms';

export default {
    // --------------For Admin--------------
    fetchRooms (query) {
        return Api().get(`${baseUrl}`, {
            params : query
        });
    },
    createRoom (room) {
        return Api().post(`${baseUrl}`, room);
    },
    updateRoom (room) {
        return Api().put(`${baseUrl}`, room);
    }
}