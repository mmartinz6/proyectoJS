
import { postSolicitud } from "../services/servicesSolicitudes.js";

const sede = document.getElementById("sede");
const fechaSalida = document.getElementById("fechaSalida");
const fechaRegreso = document.getElementById("fechaRegreso")
const codigoPc = document.getElementById("codigoPc");
const btnSiguiente = document.getElementById("btnSiguiente");
const mensaje = document.getElementById("mensaje")
const mensajeBienvenida = document.getElementById("mensajeBienvenida")


const infoUsuario = JSON.parse(localStorage.getItem("userlog"))

const mensajito = document.createElement("p")
mensajito.textContent = "¡Bienvenido/a " + infoUsuario.nombre + " " + infoUsuario.apellido +"!"
mensajito.classList.add("bienvenidoMensaje")
mensajeBienvenida.appendChild(mensajito)

btnSiguiente.addEventListener("click", async function() {

    if ( !sede.value.trim()  || !fechaSalida.value.trim()  || !fechaRegreso.value.trim()  || !codigoPc.value.trim()) {
        
        const parrafoMensaje = document.createElement("p")
        parrafoMensaje.textContent = ("* Complete todos los campos. *")
        parrafoMensaje.classList.add("mensajeError")
        mensaje.appendChild(parrafoMensaje)
        return;
    }

    const solicitudEstudiante = {
        idSolitante: infoUsuario.id,
        sede: sede.value,
        fechaSalida: fechaSalida.value,
        fechaRegreso: fechaRegreso.value,
        codigoPc: codigoPc.value,
        estadoSolicitus: "pendiente"
    };
    
    const respuestaConfirmada = await postSolicitud(solicitudEstudiante)

    if (respuestaConfirmada) {
        window.location.href="../pages/terminosCondiciones.html"
    }
    
})