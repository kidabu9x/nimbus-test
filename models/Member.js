var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MemberSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true
        },
        username : {
            type: String,
            default: ""
        },
        password: {
            type: String
        },
        phone: {
            type: Number,
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        date_of_birth: {
            type: Date,
            default: Date.now()
        },
        address: {
            type: String
        },
        university: {
            type: String,
            default: "neu"
        },
        role: {
            type: String,
            default: 'student'
        },
        facebook_url: {
            type: String
        },
        avatar_url: {
            type: String
        },
        alias: {
            type: String
        },
        gender: {
            type: String,
            default: 'male'
        },
        extra_info: {
            type: String
        },
        identity: {
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

var Member = mongoose.model("member", MemberSchema);
module.exports = Member;