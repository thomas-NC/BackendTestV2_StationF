const db = require('mongoose');
const Schema = db.Schema;

let ReservationSchema = new Schema (
    {
        name: String,
        roomName: String,
        date: String,
        timeStart: Number,
        timeEnd: Number
    }
)

module.exports = db.model('Reservation', ReservationSchema);

// name => nom de la personne qui à fait la réservation