const mongoose = require('mongoose');

const batterySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    nin: {
        type: String,
        required: true,
    },
    time: {
        type: String, 
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    numberPlate: {
        type: String,
        required: true,
    },
    batterySize: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('battery', batterySchema)
