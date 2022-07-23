const express = require("express");
var cors = require('cors');
const router = express.Router();
var axios = require('axios');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

router.post("/multichain", cors(corsOptions), (req,res) => {
    const data =req.body;
    console.log(data);

    // var url = 'http://localhost:9734'; // 9734 es el puerto de la API de multichain dependiendo del nodo
    var url = 'http://85.208.21.37:7414'; // 9734 es el puerto de la API de multichain dependiendo del nodo

    axios.post(url,
      data,{
      headers:{
          'Content-Type': 'application/json',
          // 'Authorization': 'Basic bXVsdGljaGFpbnJwYzpGWHhFYjJmUWNEOUREZnA5QThLZFlxVnc4OXpVWkxrY1pXV3BWTXVvMjRnMQ=='// es del multichain.conf
          'Authorization': 'Basic bXVsdGljaGFpbnJwYzozaEhCNzVWZlMzOHh0VUt0SFZpU2U5NXBEZVMxdWRydkpHZmNOa1dHZk16Tg=='// es del multichain.conf
      }
      }).then(r => res.json(r.data))
      .catch(error => res.json(('Error:', error)))
});

module.exports = router;