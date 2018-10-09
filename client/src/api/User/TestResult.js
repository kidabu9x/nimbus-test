
import Api from '@/api/User'

let baseUrl = 'test-results';

export default {
    
    createNewAnswer(keyClass, member_id, module, totalCorrect, totalQuestions, incorrectAnswers) {
        Api().post(`${baseUrl}`, {
            test_code           : keyClass,
            member_id           : member_id,
            module              : module,
            total_corrects      : totalCorrect,
            total_questions     : totalQuestions,
            incorrect_answers   : incorrectAnswers
        })
    }
}
