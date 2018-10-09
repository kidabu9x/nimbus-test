import Api from '@/api/User'

let baseUrl = 'member';

export default {
    checkMemberExist (memberEmail) {
        return Api().get(`${baseUrl}/check-member?email=${memberEmail}`);
    }
}