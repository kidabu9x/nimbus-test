import Api from '@/Api/User.js'

let baseUrl = 'member';

export default {
    checkMemberExist (memberEmail) {
        return Api().get(`${baseUrl}/check-member?email=${memberEmail}`);
    }
}