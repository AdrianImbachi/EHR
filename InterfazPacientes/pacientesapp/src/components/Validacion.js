import React, {useState} from "react";
import { Formulario, ContenedorBotonCentrado, Boton, MensajeError} from "../elementos/Formularios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Input from "./Input";
import '../css/estilos.css';
import saveData from "./SaveData";

const Validacion = () => {
    const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
    const [password, cambiarPassword]= useState({campo: '', valido: null});
    const [archivo, cambiarArchivo]= useState({campo: '', valido: null});
    const [paciente, cambiarPaciente]= useState({campo: '', valido: null});
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const expresiones = {
        usuario: /^[a-zA-Z0-9_.-]{4,1000}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,200}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        archivo: /^.{1,100}$/, // 4 a 12 digitos.
    }

    const onSubmit = (e) => {
        e.preventDefault();
        /*
        *Validar inputs
        */
        if (
            usuario.valido === 'true' &&
            paciente.valido === 'true' &&
            archivo.valido === 'true' &&
            password.valido
            // terminos
        ){
            cambiarFormularioValido(true);
			cambiarUsuario({campo: '', valido: ''});
			cambiarArchivo({campo: '', valido: ''});
			cambiarPaciente({campo: '', valido: null});
			cambiarPassword({campo: '', valido: null});
        }else{
            cambiarFormularioValido(false);
        }
        console.log(usuario.campo);
        console.log(paciente.campo);
        console.log(archivo.campo);
        // console.log(password.campo)

        /* 
        * se crea el objeto para de los inputs para publicarlo en el multichain
        */
        var a = {};
        a.usuario = usuario.campo;
        a.paciente = paciente.campo;
        a.archivo = archivo.campo;
        console.log(typeof(a));
        // let publicar = {"method":"publish","params":["streamehr","key1",{"json":a}],"chain_name":"cadena3"};
        let publicar = {"method":"publish","params":["EHRstream","key1",{"json":a}],"chain_name":"EHRchain"};
        publishData(publicar);


        var validarToken = archivo.campo+"?tk="+password.campo;
        console.log(validarToken);

        /* 
        let hexUsuario = text_to_hex(usuario.campo);
        let hexPaciente= text_to_hex(paciente.campo);
        let hexArchivo = text_to_hex(archivo.campo);
        // let hexPassword = text_to_hex(password.campo);

        let v = (hexUsuario+hexPaciente+hexArchivo);

        let hexjson = {"usuario":hexUsuario,"paciente":hexPaciente,"archivo":hexArchivo};
        // let hexjson = {usuario.campo,paciente.campo,archivo.campo};
        let jsoncompleto = (hexjson);
        // console.log(jsoncompleto); */
        // let publicar = {"method":"publish","params":["streamehr","key1",{"json":a}],"chain_name":"cadena3"};
        // let publicar = {"method":"publish","params":["streamehr","key1",{"json":hexjson}],"chain_name":"cadena3"};
        // let publicar = {"method":"publish","params":["streamehr","key1",{"json":v}],"chain_name":"cadena3"};
        // publishData(publicar);
    }
    /* 
    function text_to_hex(str) {
        var arr1 = [];
        for ( var n = 0, l = str.length; n < l; n++) {
            var hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    }
 */
    /* 
    * Función para publicar el multichain llamando la API
    */
    const publishData = (data) => {
        var url = 'http://localhost:8000/api/multichain';

        fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{ 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }

    // Valida el documento portable sea de extensión .html
    function validarExt() {
        var archivoInput = document.getElementById('cargarArchivoPortable');
        var archivoRuta = archivoInput.value;
        var extPermitidas = /(.html)$/i;

        if(!extPermitidas.exec(archivoRuta)){
            console.log("seleccione archivo html");
            archivoInput.value='';
            return false;
        }else {
            if(archivoInput.files && archivoInput.files[0]){
                var visor = new FileReader();
                visor.onload = function(e) {
                    document.getElementById('visorArchivo').innerHTML =
                    '<iframe width="600" height="800"  src="'+e.target.result+'"/>';
                };
                visor.readAsDataURL(archivoInput.files[0]);
            }
        }
    }
    // Del documento portable se obtiene los datos por medio del localStorage
    const verDatos = () => {
        // Patient
        let name = localStorage.getItem("name");
        let document = localStorage.getItem("document");
        let gender = localStorage.getItem("gender");
        let birthDate = localStorage.getItem("birthDate");
        let age = localStorage.getItem("age");
        let email = localStorage.getItem("email");
        let phone = localStorage.getItem("phone");
        let address = localStorage.getItem("address");
    
        // Condition
        let titlec = localStorage.getItem("titlec");
        let code = localStorage.getItem("code");
        let clinicalStatus = localStorage.getItem("clinicalStatus");
        let VerificationStatus = localStorage.getItem("VerificationStatus");
    
        // Categoria
        let category = localStorage.getItem("category");
        let reason = localStorage.getItem("reason");
        let status = localStorage.getItem("status");
        let period = localStorage.getItem("period");

        // Patient
        let person = { name, document, gender, birthDate, age, email, phone, address };
        console.log(person);
    
/*         let condition = {titlec, code, clinicalStatus, VerificationStatus}
        console.log(condition)

        let categ = {category,reason,status,period}
        console.log("categoria",categ); */

        // SaveData es la función que se llama al servidor para guardar los datos
        saveData(person);
    }

    function ingresar()  {
        validarExt();
        verDatos();
    }

    return(
        <main>
            <Formulario className="backformulario" action="" onSubmit={onSubmit}>
                <Input
                    estado={usuario}
                    cambiarEstado={cambiarUsuario}
                    tipo="text"
                    label="Usuario"
                    value={usuario}
                    placeholder="jose123"
                    name="usuario"
                    leyendaError="El usuario tiene que ser de 4 a 16 digitos y solo puede contener números, letra y guión bajo. "
                    expresionRegular={expresiones.usuario}
                />
                <Input
                    estado={paciente}
                    cambiarEstado={cambiarPaciente}
                    tipo="text"
                    label="Id Paciente"
                    placeholder="123jdj4"
                    name="paciente"
                    leyendaError="El id del paciente solo debe contener letras y numeros. "
                    expresionRegular={expresiones.usuario}
                />
                <Input
                    estado={archivo}
                    cambiarEstado={cambiarArchivo}
                    accept=".html"
                    tipo="file"
                    label="Cargar Archivo Portable"
                    placeholder=""
                    name="cargarArchivoPortable"
                    leyendaError="Solo se permite archivos con extension .html "
                    expresionRegular={expresiones.archivo}
                />
                <Input
                    estado={password}
                    cambiarEstado={cambiarPassword}
                    tipo="password"
                    label="Token"
                    placeholder="****"
                    name="addToken"
                    leyendaError="El token no permite enmendaduras "
                    expresionRegular={expresiones.usuario}
                />

                {formularioValido === false && <MensajeError>
                    <p>
                        <FontAwesomeIcon icon={faExclamationTriangle}/>
                        <b>Error: </b> Por favor rellene el formulario correctamente.
                    </p>
                </MensajeError>}
                <ContenedorBotonCentrado>
                    <Boton type="submit">Ver HC </Boton>
                    {formularioValido === true && ingresar()}
                    {/* {formularioValido === true && <MensajeExito>El formulario se envió exitosamente</MensajeExito>} */}
                </ContenedorBotonCentrado>
            </Formulario>

            {/* visor historia clínica */}
            <div className="divHC">
                <h1> Historia Clínica</h1>
            </div>
            <div className="viewerIframe" id="visorArchivo"></div>
        </main>
    );

}

export default Validacion;