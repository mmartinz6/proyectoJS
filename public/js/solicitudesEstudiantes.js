import { postSolicitud } from "../services/servicesSolicitudes.js";

const nombreUsuario = document.getElementById("nombreUsuario");
const sede = document.getElementById("sede");
const fechaSalida = document.getElementById("fechaSalida");
const fechaRegreso = document.getElementById("fechaRegreso")
const codigoPc = document.getElementById("codigoPc");
const btnSiguiente = document.getElementById("btnEnviarSolicitud");
const mensaje = document.getElementById("mensaje")


btnSiguiente.addEventListener("click", async function() {

    if (!nombreUsuario.value.trim() || !sede.value || !fechaSalida.value || !fechaRegreso.value || !codigoPc.value.trim()) {
        
        const parrafoMensaje = document.createElement("p")
        parrafoMensaje.textContent = ("* Complete todos los campos. *")
        parrafoMensaje.classList.add("mensajeError")
        mensaje.appendChild(parrafoMensaje)
        return;
    }
    
    const respuestaConfirmada = await postSolicitud(solicitudEstudiante)

    console.log(respuestaConfirmada);
    
})