import React from "react";
import { Label, GrupoInput, LeyendaError, IconoValidacion, Input } from "../elementos/Formularios";
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ComponenteInput = ({estado, cambiarEstado, tipo, label, placeholder, name, leyendaError, expresionRegular}) => {

    // cuando hay un cambio en el input se ejecuta la función onChange
    const onChange = (e) => {
        // cambiarEstado({...estado, campo: e.target.value}); //cambia el estado agregando un nuevo objeto, el objeto va a contener las propiedades del estado anteriormente y que la prop campo sea igual al input
        cambiarEstado({...estado, campo: e.target.value});
    }

    const validacion = () => {
        if(expresionRegular){
            if(expresionRegular.test(estado.campo)){
                cambiarEstado({...estado, valido: 'true'})
            }else{
                cambiarEstado({...estado, valido: 'false'})
            }
        }
    }

    return(
        <div>
            <Label htmlFor={name} valido={estado.valido}>{label}</Label>
            <GrupoInput>
                <Input 
                    type={tipo} 
                    placeholder={placeholder} 
                    id={name}
                    value={estado.campo}
                    onChange={onChange}
                    onKeyUp={validacion}
                    onBlur={validacion}
                    valido={estado.valido}
                />
                <IconoValidacion 
                    icon={estado.valido === 'true' ? faCheckCircle: faTimesCircle} 
                    valido={estado.valido}
                />
            </GrupoInput>
            <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
        </div>

    );
}

export default ComponenteInput;