const express = require('express');
const parser = require('body-parser');
const db = require('mongoose');
db.set('useFindAndModify', false);

const app = express();

//paramétrage du server express
app.use(parser.urlencoded({extended: true}));
app.use(express.json());
app.use(function(req, res, next) {
	res.setHeader('Content-type', 'application/json');
	res.setHeader('Accept', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-type, Authorization, Access-Control-Allow-Origin');
	next();
})



const port = 3030;

const roomsController = require('./controllers/room.controller.js');
const reservationsController = require('./controllers/reservation.controller.js');

//On utilise MLab pour stocker les informations, c'est un service qui permet d'utiliser MongoDB à travers AWS
db.connect('mongodb://thomasNC:Passw0rd@ds317808.mlab.com:17808/stationf_backend_test', (err) =>
{
    if(err)
    {
        console.log(err);
    }
    console.log("connecté à la db");
});

////// Endpoints //////
// on désactive les routes faisant appel à des fonctions qui ne font pas partie du projet

app.get('/rooms', roomsController.getRooms);
//app.get('/room:id', roomsController.getRoom);

//CRUD pour les réservations
app.get('/reservations', reservationsController.getReservations);
app.get('/reservations-check:date', reservationsController.getAvailableReservations);
//app.get('/reservation/:id', reservationsController.getReservation);
app.post('/reservation', reservationsController.createReservation);
//app.put('/reservation:id', reservationsController.updateReservation);
//app.delete('/reservation:id', reservationsController.deleteReservation);

//lancement du serveur
app.listen(port, (err) =>
{
    if(err)
    {
        console.log(err);
    }
    console.log(`serveur lancé sur le port ${port} ...`);
});