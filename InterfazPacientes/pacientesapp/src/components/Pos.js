// https://mauriciogc.medium.com/react-haciendo-peticiones-con-axios-y-hooks-27029dc36299
import axios from 'axios';

const todasPersonas = async (state) => {
    // const peticion = await axios.get(`json/postres.json`);
    // const peticion = await axios.get(`https://rickandmortyapi.com/api/character`);
    // const peticion = await axios.get(`https://r3.smarthealthit.org/Patient/mdc-0001`);
    // const peticion = await axios.get('https://r3.smarthealthit.org/Patient/_search?_format=json');
    const peticion = await axios.get('https://r3.smarthealthit.org/Patient/');
    // state(peticion.data.entry);
    state(peticion.data.entry);
    // console.log(peticion.data.entry[0].resource.name[1]);
}
const unicaPersona = async (id, state) => {
    // const peticion = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    const peticion = await axios.get(`https://r3.smarthealthit.org/Patient/${id}`);
    // state(peticion.data.name[1]);
    state(peticion.data.name[0]);
    console.log(peticion.data);
    console.log(peticion.data.name[0].given[0]);
}

export {
    todasPersonas,
    unicaPersona
}