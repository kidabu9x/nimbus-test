import Api from '@/api/User'

let baseUrl = 'enrollments';

export default {
    confirmEmail (data) {
        return Api().post(`${baseUrl}/${data.eid}/confirm-email`, data);
    }
}