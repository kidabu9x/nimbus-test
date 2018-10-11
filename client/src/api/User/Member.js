import Api from '@/api/User'

let baseUrl = 'members';

export default {
    checkMemberExist (memberEmail) {
        return Api().get(`${baseUrl}/check-member?email=${memberEmail}`);
    },
    createNewMember (member) {
        return Api().post(`${baseUrl}`, member);
    },
}