// Se llama al servidor backendPacientes para guardar los datos del paciente, la función es llamada en verDatos() del componente Validacion.js 

const saveData = (data) => {
    var url = 'http://localhost:8000/api/pacientes';

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
  }

export default saveData;