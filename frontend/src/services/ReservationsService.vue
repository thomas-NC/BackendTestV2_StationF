<script>
//on stocke dans ce fichier toutes les fonctions qui vont se connecter aux endpoints de notre API REST.
//encore une fois on en utilise uniquement une partie, mais le cadre de ce projet je les laisse telles quelles
const allReservationsUrl = 'http://localhost:3030/reservations';
const reservationUrl = 'http://localhost:3030/reservation';

export default {
    getAllReservations(){
        return fetch(allReservationsUrl)
        .then((response) =>
        {
            return response.json();
        })
    },
    getReservation(id){
        return fetch(`${reservationUrl}${id}`)
        .then((response) =>
        {
            return response.json();
        })
    },
    getAvailableReservations(date)
    {
        return fetch(`${allReservationsUrl}-check${date}`)
        .then((response) =>
        {
            return response.json();
        })
    },
    deleteReservation(id){
        return fetch(`${reservationUrl}${id}`, {
            method: 'delete'
        })
        .then((response) => 
        {
            return response.json();
        })
    },
    updateReservation(id, name, roomName, date, timeStart, timeEnd){
        return fetch(`${reservationUrl}${id}`, {
            method: 'put',
            headers: {
                'accept' : 'application/json',
                'content-type' : 'application/json'
            },
            body: JSON.stringify(
            {
                "name": name,
                "roomName": roomName,
                "date": date,
                "timeStart": timeStart,
                "timeEnd": timeEnd
            })
        })
        .then((response) =>
        {
            return response.json();
        })
    },
    createReservation(name, roomName, date, timeStart, timeEnd) {
        return fetch(reservationUrl, {
            method: 'post',
            headers: {
                'accept':'application/json',
                'content-type':'application/json'
            },
            body: JSON.stringify(
            {
                "name": name,
                "roomName": roomName,
                "date": date,
                "timeStart": timeStart,
                "timeEnd": timeEnd
            })
        })
        .then((response) =>
        {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
</script>