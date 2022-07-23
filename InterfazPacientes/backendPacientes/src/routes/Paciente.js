const express = require("express");
const userSchema = require("../models/ModelPaciente");
var cors = require('cors');
const router = express.Router();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//Guardar datos personales del paciente
router.post("/pacientes", cors(corsOptions), (req,res) => {
    // res.send("crear paciente");
    const patient = userSchema(req.body);
    patient
        .save()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message:error}));
});

module.exports = router;