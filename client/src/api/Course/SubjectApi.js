import Api from '@/api/Api.js'

let adminUrl = '/api/subject/admin'

export default {
    // --------------For Admin--------------
    fetchAllSubjects () {
        return Api().get(`${adminUrl}`);
    },
    fetchOneSubject (handle) {
        return Api().get(`${adminUrl}/${handle}`);  
    },
    createNewSubject (newSubject) {
        return Api().post(`${adminUrl}`, newSubject);
    }
}