var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var shortId = require("shortid");

var ClassSchema = new Schema(
    {   
        is_recruit : {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        main_teacher_id : {
            type: String,
            default: null
        },
        main_room_id : {
            type: String,
            default: null
        },
        course_id : {
            type: String
        },
        subject_id : {
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
        },
        fb_group_url : {
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

var Class = mongoose.model("class", ClassSchema);
module.exports = Class;