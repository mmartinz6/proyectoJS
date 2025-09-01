import { postSolicitud } from "../services/servicesSolicitudes.js";

const aceptoTerminos = document.getElementById("aceptoTerminos");
const btnEnviar = document.getElementById("btnEnviar");
const btnAtras = document.getElementById("btnAtras");
const mensajeBienvenida = document.getElementById("mensajeBienvenida");
const mensaje = document.getElementById("mensaje");
const contenidoModalCuenta = document.getElementById("contenidoModalCuenta");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

const infoUsuario = JSON.parse(localStorage.getItem("userlog"));

//Muestra mensaje de bienvenida al usuario
const mensajito = document.createElement("p")
mensajito.textContent = "¡Bienvenido/a " + infoUsuario.nombre + " " + infoUsuario.apellido +"!"
mensajito.classList.add("bienvenidoMensaje")
mensajeBienvenida.appendChild(mensajito)

//Modal, cuenta con información del usuario
const nombreCompleto = document.createElement("p");
nombreCompleto.innerHTML = "<strong>Nombre completo:</strong> " + infoUsuario.nombre + " " + infoUsuario.apellido;

const nombreUsuario = document.createElement("p");
nombreUsuario.innerHTML = "<strong>Username:</strong> " + infoUsuario.userName;

const correo = document.createElement("p");
correo.innerHTML = "<strong>Correo:</strong> " + infoUsuario.email;

const telefono = document.createElement("p");
telefono.innerHTML = "<strong>Teléfono:</strong> " + infoUsuario.telefono;

contenidoModalCuenta.appendChild(nombreCompleto);
contenidoModalCuenta.appendChild(nombreUsuario);
contenidoModalCuenta.appendChild(correo);
contenidoModalCuenta.appendChild(telefono);

//Botón para cerrar sesion
btnCerrarSesion.addEventListener("click",function() {
    localStorage.removeItem("userlog");
    window.location.href="../pages/login.html"
});

//Botón para volver página anterior
btnAtras.addEventListener("click",function() {
    window.location.href="../pages/solicitudesEstudiantes.html"
});

//Botón enviar
btnEnviar.addEventListener("click", async function() {
    mensaje.innerHTML = "";

    if (!aceptoTerminos.checked) {
        const parrafoMensaje = document.createElement("p");
        parrafoMensaje.textContent = "*Debes aceptar los términos para continuar*";
        parrafoMensaje.classList.add("mensajeError");
        mensaje.appendChild(parrafoMensaje)
        return;
    }

    const solicitudTemporal = JSON.parse(localStorage.getItem("solicitudTemporalEstudiante"));

    const respuestaConfirmada = await postSolicitud(solicitudTemporal);

    if (respuestaConfirmada) {
        localStorage.removeItem("solicitudTemporalEstudiante");
       /*  window.location.href="../pages/solicitudesEstudiantes.html" */
    }

})