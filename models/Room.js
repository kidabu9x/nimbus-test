var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RoomSchema = new Schema(
    {   
        name: {
            type: String,
            required: true,
            trim: true
        },
        size: {
            type: Number,
            required: true
        },
        location_id: {
            type: String,
            default: null
        }
    },
    {
        timestamps: {
            createAt: 'create_at',
            updateAt: 'update_at'
        }
    }
);

var Room = mongoose.model("room", RoomSchema);
module.exports = Room;