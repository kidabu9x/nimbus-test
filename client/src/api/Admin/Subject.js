import Api from '@/api/Admin.js';

let baseUrl = 'subjects';

export default {
    // --------------For Admin--------------
    fetchAllSubjects () {
        return Api().get(`${baseUrl}`);
    },
    fetchOneSubject (handle) {
        return Api().get(`${baseUrl}/${handle}`);  
    },
    createNewSubject (newSubject) {
        return Api().post(`${baseUrl}`, newSubject);
    }
}