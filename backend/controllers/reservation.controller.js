const Reservation = require('../models/reservation.model');
// CRUD complet pour les réservations, on utilise pour l'instant seulement les 2 premières fonctions ainsi que
// la fonction createReservation(). Pas besoin d'effacer les autres, elles pourraient servir à améliorer l'app au préalable
exports.getReservations = function(req,res)
{
    Reservation.find({}, (err, reservation) =>
    {
        if(err)
        {
            console.log(err);
        }
        res.send(reservation);
    })
}

exports.getAvailableReservations = function(req, res)
{
    Reservation.find({date: req.params.date}, (err, reservation)=>
    {
        if(err)
        {
            console.log(err);
        }
        res.send(reservation);
    })
}

exports.getReservation = function(req, res)
{
    Reservation.findById(req.params.id, (err, reservation) =>
        {
            if(err)
            {
                console.log(err);
            }
            res.send(reservation);
        })
}

exports.createReservation = function(req, res)
{
    let reservation = new Reservation (
        {
            name: req.body.name,
            roomName: req.body.roomName,
            date: req.body.date,
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd
        }
    )
    
    reservation.save((err) =>
        {
            if(err)
            {
                console.log(err);
            }
            res.send(reservation);
            console.log("reservation ajoutée");
        })
    
}

exports.updateReservation = function(req, res)
{
    Reservation.findByIdAndUpdate(req.params.id, req.body, (reservation, err) =>
        {
            if(err)
            {
                console.log(err);
            }
            res.send(reservation);
        })
}

exports.deleteReservation = function(req, res)
{
    Reservation.findByIdAndDelete(req.params.id, (err) =>
    {
        if(err)
        {
            console.log(err);
        }
        res.send(200);
        console.log("produit supprimmé");
    })
}