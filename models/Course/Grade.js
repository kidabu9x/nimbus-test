var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var shortId = require("shortid");

var GradeSchema = new Schema(
    {   
        is_in_recruit : {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            required: true,
            trim: true
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
        },
        school_days : {
            type: Array
        },
        school_address : {
            type: String
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