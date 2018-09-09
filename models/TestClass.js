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
        teacher_id: {
            type: String
        },
        handle: {
            type: String
        },
        time: {
            type: Number,
            default: 30
        },
        number_of_students: {
            type: Number,
            default: 10
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