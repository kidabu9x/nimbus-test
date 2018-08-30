import Api from '@/api/Api.js'

export default {
    // --------------For Admin--------------
    fetchMembers () {
        return Api().get(`/api/members/admin`);
    },
    createNewMember (member) {
        return Api().post(`/api/members/admin`, member);
    },
    updateMember (member) {
        return Api().put(`/api/members/admin`, member);
    },
    deleteMember (memberId) {
        return Api().delete(`/api/members/admin/${memberId}`);
    }
}