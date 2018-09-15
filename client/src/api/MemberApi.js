import Api from '@/api/Api.js'

const adminUrl = '/api/member/admin'

export default {
    // --------------For Admin--------------
    fetchMembers () {
        return Api().get(`${adminUrl}`);
    },
    getMemberInfo (memberId) {
        return Api().get(`${adminUrl}?member_id=${memberId}`);
    },
    createNewMember (member) {
        return Api().post(`${adminUrl}`, member);
    },
    updateMember (member) {
        return Api().put(`${adminUrl}`, member);
    },
    deleteMember (memberId) {
        return Api().delete(`${adminUrl}/${memberId}`);
    },
    fetchTeachers() {
        return Api().get(`${adminUrl}/teachers`);
    },
    checkMemberExist (memberEmail) {
        return Api().get(`${adminUrl}/check-member?email=${memberEmail}`);
    }
}