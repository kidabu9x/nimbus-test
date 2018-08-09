var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GradeSchema = new Schema(
    {
        name_grade: {
            type: String,
            required: true,
            trim: true
        },
        start_date: {
            type: Date,
            default: new Date()
        },
        estimated_end_date: {
            type: Date,
            default: new Date()
        },
        exactly_end_date: {
            type: Date,
            default: new Date()
        },
        quantities: {
            type: Number,
            default: 0
        },
        type_class: {
            type: String,
            required: true
        },
        students: {
            type: Array,
            default: []
        },
        lession: [{
            date: {
                type: Date,
                default: new Date()
            },
            teacher: {
                type: String
            },
            student: [String],
            description: {
                type: String,
                default: null
            },
            room: {
                type: String,
                default: null
            }
        }],
        active: {
            type: Boolean,
            default: true
        },
        done: {
            type: Boolean,
            default: false
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