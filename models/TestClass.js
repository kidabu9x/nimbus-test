var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TestSchema = new Schema(
    {
        active: {
            type: Boolean,
            default: true
        },
        name: {
            type: String
        },
        teacherId: {
            type: String,
            default: null
        },
        teacher_name: {
            type: String
        },
        handle: {
            type: String
        },
        module: {
            type: Number,
            default: 1
        },
        time: {
            type: Number,
            default: 30
        },
        number_of_students: {
            type: Number,
            default: 10
        },
        results: {
            type: Array,
            default: []
        }
    }, 
    {
        timestamps: {
            createAt: 'create_at',
            updateAt: 'update_at'
        }
    }
);

var testClass = mongoose.model("TestClass", TestSchema);
module.exports = testClass;