var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var shortId = require("shortid");

var LessionSchema = new Schema(
    {   
        class_id : {
            type: String
        },
        teacher_id : {
            type: String
        },
        handle: {
            type: String,
            default: shortId.generate()
        },
        school_date : {
            type: String
        },
        start_hour : {
            type: String
        },
        end_hour : {
            type: String
        },
        description : {
            type: String
        },
        note: {
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

var Lession = mongoose.model("lessions", LessionSchema);
module.exports = Lession;