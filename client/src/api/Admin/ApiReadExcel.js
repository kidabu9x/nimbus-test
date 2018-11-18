import Admin from "../Admin";

let baseUrl = 'readExcel';
export default {
    readExcel(file) {
        return Admin().post(`${baseUrl}/getFile`, {
            file: file
        });
    }
}