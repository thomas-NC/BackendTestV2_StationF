<template>
  <div class="container">
    <div class="header">
      <h1>Station F - Réservation De Salles</h1>
      <Datepicker class="datepicker" placeholder="Pick a date" :disabled-dates="disabledDates" @selected="showRooms = true" v-model="date"/>
    </div>
    <div v-if="this.showRooms === true">
      <table>
          <tr>
            <th></th>
            <th v-for="room in rooms" v-bind:key="room">
              <h2>{{ room.name }}</h2>
              <p> Description: "{{ room.description }}"</p>
              <p>Capacité: {{ room.capacity}} </p>
              <p v-if="room.equipements[0] !== undefined">Equipements: </p>
              <ul v-for="equipement in room.equipements" v-bind:key="equipement">
                  <li>
                    {{equipement.name}}
                  </li>
              </ul>
            </th>        
          </tr>
          <tr class="reservationsBoard">
            <td>
              <tr v-for="n in 11" v-bind:key="n">
                <td>
                  {{ n + 7}} : 00
                </td>
              </tr>
            </td>
            <td v-for="room in rooms" v-bind:key="room">
              <tr v-for="value in getOpenTimes(room.name)" v-bind:key="value">               
                <td v-if="showButton(value) == true">
                  <md-button class="buttons" type="button" name="button" v-on:click="parseDate(date); makeReservation('username', room.name, date, value, value+1)">Réserver</md-button>
                </td>
                <td v-else class="error-message">
                  salle Réservée
                </td>                
              </tr>
            </td>
          </tr>
      </table>
    </div>
    <div v-else>
      <article class="intro">Bienvenue sur le portail de réservation de salles de Station F!<br>
      pour commencer à réserver des salles , clickez sur le petit bouton ci-dessus et choisissez une date</article>
    </div>
  </div>
</template>


<style>
body {
  width: 100%;
  background: rgb(20,116,181);
  background: linear-gradient(0deg,  #b2e5ff 0%, rgba(91,56,226,1) 80%);
}
.container {
  font-family: 'Raleway', sans-serif;
  padding-bottom: 100px;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0 40px 0;
}
.header h1 {
  color: #F1F1F1;
}
.header .datepicker {
  padding: 90px 0 0 0;
}
table {
  margin: 0 2.5% 0 2.5%;
  border-collapse: collapse;
  width: 95%;
  color: white;
}
table th {
  background-color:  #282828;
  vertical-align: top;
}
table th h2 {
  color: #b2e5ff;
}
table, th, td {
  border: 1px solid white;
}
table .reservationsBoard td tr td{
  border: 0px;
  border-bottom: 1px solid white;
  background-color: rgba(28, 28, 28, 0.4);
  min-width: 100px;
  width: 10%;
  height: 65px;
  text-align: center;
  vertical-align: middle;
}
table .reservationsBoard td tr td .buttons {
  background-color:  white;
}
table .reservationsBoard td tr .error-message {
  color: #c33737;
}
.intro {
  color: white;
  text-align: center;
  padding-top: 30px;
  font-size: 22px;
  line-height: 25px;
  letter-spacing: 0.7px;
}
</style>

<script>
import Datepicker from 'vuejs-datepicker'
// on importe ReservationService pour pouvoir utiliser les fonctions de l'api
import ReservationService from '../services/ReservationsService.vue'
// moment nous servira à formatter la valeur de la date séléctionnée avec le DatePicker 
import moment from 'moment'

export default {
    name: 'reservation',
    components: {
        Datepicker,
    },
    data() {
      return {
        date: "",
        showRooms: false,
        reservations: [],
        rooms: [],
        disabledDates: {
          to: new Date()
        }
      }
    },
    methods: {
      makeReservation: function(name, roomName, date, timeStart, timeEnd)
      {
        ReservationService.createReservation(name, roomName, date, timeStart, timeEnd);
      },
      getAvailableReservations: function(date)
      {
        ReservationService.getAvailableReservations(date)
        .then((data) =>
        {
          this.reservations = data;
        });
      },
      parseDate: function(date)
      {
        this.date = moment(date).format("DD MMMM YYYY");
      },
      // on passe par les fonctions getOpenTimes et showButton pour pouvoir itérer à travers les v-for dans le template
      // et savoir quand afficher un bouton de réservation ou un message indiquant que la salle est déja réservée
      getOpenTimes: function(name)
      {
        // fonction servant à récupérer les heures bloquées pour une salle donnée, retournant un array des horaires disponibles
        let times = [];
        let dispo = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        for(let i = 0; i < this.reservations.length; i ++)
        {
          if(this.reservations[i].roomName == name)
          {
            times.push(this.reservations[i].timeStart);
          }
        }
        for(let x = 0; x < times.length; x ++)
        {
          dispo.splice(dispo.indexOf(times[x]), 1, 0);
        }
        return dispo;
      },
      showButton: function(time)
      {
        if(time == 0)
        {
          return false;
        }
        else
        {
          return true;
        }
      }
    },
    created()
    {
      fetch('http://localhost:3030/rooms')
      .then((response) =>
      {
      return response.json();
      })
      .then((data) =>
      {
      this.rooms = data;
      })       
    },
    // à chaque modification de la date, on va chercher les réservations déja faites pour ce jour
    updated()
    { 
      this.parseDate(this.date);
      this.getAvailableReservations(this.date);
    }
}
</script>