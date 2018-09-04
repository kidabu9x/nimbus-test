var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var shortId = require("shortid");

var GradeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        start_date: {
            type: Date,
            default: new Date()
        },
        end_date: {
            type: Date,
            default: new Date()
        },
        course_id : {
            type: String
        },
        main_teacher_id : {
            type: String
        },
        handle: {
            type: String,
            default: shortId.generate()
        }
    },
    {
        timestamps: {
            createAt: 'create_at',
            updateAt: 'update_at'
        }
    }
);

var Grade = mongoose.model("grade", GradeSchema);
module.exports = Grade;