var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ExamScheduleSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            trim: true
        },
        ic3_module: {
            type: Number
        },
        exam_date: {
            type: Date,
            default: new Date()
        },
        shifts: [{
            slots: {
                type: Number,
                default: 0
            },
            hours: {
                type: String
            },
            student: [
                {
                    student_id: {
                        type: String
                    },
                    registered_at: {
                        type: Date,
                        default: new Date()
                    },
                    score: {
                        type: Number
                    },
                    is_done: {
                        type: Boolean,
                        default: false
                    }
                }
            ]
        }]
    },
    {
        timestamps: {
            createAt: 'create_at',
            updateAt: 'update_at'
        }
    }
);

var ExamSchedule = mongoose.model("ExamSchedules", ExamScheduleSchema);
module.exports = ExamSchedule;