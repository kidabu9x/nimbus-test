var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EnrollmentSchema = new Schema(
    {   
        class_id : {
            type: String
        },
        user_id : {
            type: String
        },
        emailed: {
            status: {
                type: Boolean,
                default: false
            },
            sender_id: {
                type: String,
                default: null
            },
            sent_at: {
                type: String,
                default: null
            },
            is_confirmed: {
                type: Boolean,
                default: false
            }
        },
        called: {
            status: {
                type: Boolean,
                default: false
            },
            caller_id: {
                type: String,
                default: null
            },
            called_at: {
                type: String,
                default: null
            },
            is_confirmed: {
                type: Boolean,
                default: false
            }
        },
        paid: {
            status: {
                type: Boolean,
                default: false
            },
            collector_id : {
                type: String,
                default: null
            },
            collected_at: {
                type: String,
                default: null
            },
            amount: {
                type: Number,
                default: 0
            }
        },
        description: {
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

var Enrollment = mongoose.model("enrollment", EnrollmentSchema);
module.exports = Enrollment;