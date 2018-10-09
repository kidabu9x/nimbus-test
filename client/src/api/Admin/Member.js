import Api from '@/api/Admin';

let baseUrl = 'members';

export default {
    // --------------For Admin--------------
    fetchMembers (query) {
        return Api().get(`${baseUrl}`, {
            params : query
        });
    },
    getMemberInfo (memberId) {
        return Api().get(`${baseUrl}?member_id=${memberId}`);
    },
    createNewMember (member) {
        return Api().post(`${baseUrl}`, member);
    },
    updateMember (member) {
        return Api().put(`${baseUrl}`, member);
    },
    deleteMember (memberId) {
        return Api().delete(`${baseUrl}/${memberId}`);
    },
    fetchTeachers() {
        return Api().get(`${baseUrl}/teachers`);
    },
    checkIsNotStudent(email) {
        return Api().get(`${baseUrl}/check-member?email=${email}`);
    },
    auth(user) {
        return Api().post(`${baseUrl}/auth`, user);
    }
}