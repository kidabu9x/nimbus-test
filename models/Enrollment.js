var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EnrollmentSchema = new Schema(
    {   
        class_id : {
            type: String,
            required: true
        },
        member_id : {
            type: String,
            required: true
        },
        emailed: {
            sender_id: {
                type: String,
                default: null
            },
            is_sent: {
                type: Boolean,
                default: false
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
            is_called: {
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
            is_collected: {
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
        tested: {
            is_collected: {
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
            },
            tested_at : {
                type: String,
                default: null
            },
            score: {
                type: Number,
                default: null
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