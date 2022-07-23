const mongoose = require("mongoose");
const { use } = require("../routes/Paciente");

const pacienteSchema = mongoose.Schema({
    name: String,
    document: String,
    gender: String,
    birthDate: Date,
    age: String,
    email: String,
    phone: String,
    address: String
});

module.exports = mongoose.model('Pacientes', pacienteSchema);