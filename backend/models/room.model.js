const db = require('mongoose');
const Schema = db.Schema;

let RoomSchema = new Schema(
    {
        name: String,
        description: String,
        capacity: Number,
        equipements: {
            name: String
        }
    }
)

module.exports = db.model('Room', RoomSchema);