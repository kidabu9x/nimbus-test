
import Api from '@/api/User'

let baseUrl = 'test';

export default {
    checkCode(keyClass) {
        return Api().get(`${baseUrl}/${keyClass}`);
    }
}
