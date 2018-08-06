var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        id_code: {
            type: Number,
            required: true
        },
        full_name: {
            type: String,
            required: true
        },
        date_of_birth: {
            type: String,
            required: true
        },
        web_test_count: {
            type: Number,
            default: 0
        },
        address: {
            type: String
        },
        come_from: {
            type: String
        },
        role: {
            type: String,
            default: 'student'
        },
        class : [String]
    },
    {
        timestamps: {
            createAt: 'create_at',
            updateAt: 'update_at'
        }
    }
);

var User = mongoose.model("user", UserSchema);
module.exports = testClass;