const mongoose = require('mongoose');


const cartyreclinicSchema = new mongoose.Schema({
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
    modelType: {
        type: String,
        required: true,
    },
    tyreService: {
        type: String,
        required: true,
    }
});

const Cartyreclinic = mongoose.model('Cartyreclinic', cartyreclinicSchema);

module.exports = Cartyreclinic;
