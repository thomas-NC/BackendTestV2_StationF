const Room = require('../models/room.model');

exports.getRooms = function(req, res)
{
    Room.find({}, (err, room) =>
    {
        if(err)
        {
            console.log(err);
        }
        res.send(room);
    })
}

exports.getRoom = function(req, res)
{
    Room.findById(req.params.id, (err, room) =>
    {
        if(err)
        {
            console.log(err);
        }
        res.send(room);
    })
}
