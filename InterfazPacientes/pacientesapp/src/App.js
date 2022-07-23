import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BotonMenu } from "./elementos/Formularios";

import Inicio from './components/Inicio';
import Personaje from './components/Personaje';
import Validacion from './components/Validacion';

function App() {
  const [verPer, setVerPer] = useState(false);
  const [verValidacion, setVerValidacion] = useState(false);

  const Menu = () => {
    return (
      <nav>
        <BotonMenu type="button"
          onClick={() => { setVerPer(!verPer); }}>
          {verPer ? "Ocultar Lista" : "Ver lista"}
        </BotonMenu>

        <BotonMenu type="button" 
          onClick={() => { setVerValidacion(!verValidacion);}}>
          {verValidacion ? "Ocultar" : " Validar"}
        </BotonMenu>
      </nav>
    )
  };

  return (
    <div>
      <Menu/>
      <BrowserRouter>
        <Routes>
          {verPer ? <Route path='/' element={<Inicio></Inicio>} /> : null}
          <Route path='/persona/:id' element={<Personaje></Personaje>} />
          {/* <Route path='/visualizar' element={<Visualizar />} /> */}
          {verValidacion ? <Route path='/' element={<Validacion />} /> : null}
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;