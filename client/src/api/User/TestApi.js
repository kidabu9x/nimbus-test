
import Api from '@/Api/User.js'

let baseUrl = 'test';

export default {
    checkCode(keyClass) {
        return Api().get(`${baseUrl}/${keyClass}`);
    },
    createNewAnswer(keyClass, member_id, module, totalCorrect, totalQuestions, incorrectAnswers) {
        Api().post(`/api/test-result`, {
            test_code           : keyClass,
            member_id           : member_id,
            module              : module,
            total_corrects      : totalCorrect,
            total_questions     : totalQuestions,
            incorrect_answers   : incorrectAnswers
        })
    }
}
