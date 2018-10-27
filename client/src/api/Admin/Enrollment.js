import Api from '@/api/Admin';

let baseUrl = 'enrollments';

export default {
    fetchEnrollments (query) {
        return Api().get(`${baseUrl}`, {
            params : query
        });
    },
    createEnrollment (newEnroll) {
        return Api().post(`${baseUrl}`, newEnroll);
    },
    updateEnrollment (enroll) {
        return Api().put(`${baseUrl}/${enroll._id}`, enroll);
    },
    deleteEnrollment (enroll) {
        return Api().delete(`${baseUrl}/${enroll._id}`);
    },
    sendEmail (data) {
        return Api().post(`${baseUrl}/send-email`, data);
    }
}