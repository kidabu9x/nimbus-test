var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TestResultSchema = new Schema(
    {
        module: {
            type: Number
        },
        test_id : {
            type: String
        },
        username : {
            type: String
        },
        answers : {
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

var TestResult = mongoose.model("TestResults", TestResultSchema);
module.exports = TestResult;