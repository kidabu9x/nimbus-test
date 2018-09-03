import Api from '@/api/Api.js'

export default {
    // --------------For Admin--------------
    fetchMembers () {
        return Api().get(`/api/member/admin`);
    },
    createNewMember (member) {
        return Api().post(`/api/member/admin`, member);
    },
    updateMember (member) {
        return Api().put(`/api/member/admin`, member);
    },
    deleteMember (memberId) {
        return Api().delete(`/api/member/admin/${memberId}`);
    },
}