import React, { useEffect, useState } from "react";
import { todasPersonas } from "./Pos";

const Inicio = ()=> {
    const [personas, setPersonas] = useState(null);

   useEffect(()=>{
        todasPersonas(setPersonas)
    },[]) 

    return(
        <>  
            <br/>          
            <table className="table table-dark table-striped table-hover table-bordered">
                <thead>
                    <tr scope='col'>
                        {/* <th scope="col">Id</th> */}
                        <th>Id usuario</th>                                    
                        <th>Nombre usuario</th>                                    
                    </tr>
                </thead>
                <tbody>                                
                    {personas != null ? (
                        personas.map(persona => (
                        <tr  scope ='row' key={persona.id}>
                            <td><a href={`/persona/${persona.resource.id}`}>{persona.resource.id}</a></td>
                            <td><a href={`/persona/${persona.resource.id}`}>{persona.resource.name.given}</a></td>
                        </tr>
                        ))
                    ) : ('no hay persona')};                                
                </tbody>
            </table>
        </>
    )
}
export default Inicio;