var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TestResultSchema = new Schema(
    {
        module: {
            type    : Number
        },
        test_code : {
            type    : String
        },
        member_id : {
            type    : String
        },
        total_corrects : {
            type    : Number
        },
        total_questions : {
            type    : Number
        },
        score   : {
            type    : Number
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