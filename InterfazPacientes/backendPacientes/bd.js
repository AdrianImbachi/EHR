const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/Paciente");
const userMultichain = require("./src/routes/multichain");
const path = require("path");

require("dotenv").config();
var cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', userMultichain);

app.use(express.static(
    path.join(__dirname, '../pacientesapp/build')
));

// rutas
/* app.get('/', (req, res) => {
    res.send("Bienvenido a la API");
});
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../pacientesapp/build', 'index.html'));
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("conectado a MongoDB Atlas"))
    .catch((error) => console.log(error));

app.listen(port, () => console.log('servidor en el puerto', port));