import Api from '@/api/Admin';

let baseUrl = 'enrollments';

export default {
    fetchEnrollments (query) {
        return Api().get(`${baseUrl}`, {
            params : query
        });
    },
    countEnrollments (query) {
        return Api().get(`${baseUrl}/count`, {
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
        return Api().post(`${baseUrl}/${data.enroll_id}/send-email`, data);
    },
    call (data) {
        return Api().post(`${baseUrl}/${data.enroll_id}/call`, data);
    },
    paid (data) {
        return Api().post(`${baseUrl}/${data.enroll_id}/paid`, data);
    },
    note (data) {
        return Api().post(`${baseUrl}/${data.enroll_id}/note`, data);
    }
}