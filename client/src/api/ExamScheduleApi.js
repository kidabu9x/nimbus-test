import Api from '@/api/Api.js'

export default {
    fetchAllSchedules() {
        return Api().get(`/api/schedule/admin`);
    },
    createNewSchedule(newSchedule) {
        return Api().post(`/api/schedule/admin`, newSchedule);
    }
}