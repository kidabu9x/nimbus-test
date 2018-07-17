import Api from '@/api/Api.js'

export default {
    checkCode(keyClass) {
        return Api().get(`/api/test-class/${keyClass}`);
    },
    createNewAnswer(keyClass, username, totalCorrect, point, answers, questions) {
        return Api.put(`/api/test-class/${keyClass}`, {
            username: username,
            total_correct: totalCorrect,
            point_per_quest: point,
            answers: answers,
            questions: questions
        })
    }
}