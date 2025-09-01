import {getUsuarios} from "../services/servicesRegistro.js";

const sede = document.getElementById("sede");
const fechaSalida = document.getElementById("fechaSalida");
const fechaRegreso = document.getElementById("fechaRegreso")
const codigoPc = document.getElementById("codigoPc");
const btnSiguiente = document.getElementById("btnSiguiente");
const mensaje = document.getElementById("mensaje")
const mensajeBienvenida = document.getElementById("mensajeBienvenida")
const contenidoModalCuenta = document.getElementById("contenidoModalCuenta")
const btnCerrarSesion = document.getElementById("btnCerrarSesion")


const infoUsuario = JSON.parse(localStorage.getItem("userlog"))

//Muestra mensaje de bienvenida con nombre del usuario
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
})

// Función para asignar profesor según sede (devuelve id del profesor)
async function asignarProfesor(sede) {
    const usuarios = await getUsuarios();

    const profesor = usuarios.find(function(usuario) {
        return usuario.rol === "profesor" && usuario.sede.toLowerCase() === sede.toLowerCase();
    });

    if (profesor) {
        return profesor.id;  // devolvemos el id del profesor
    } else {
        return "Por asignar";
    }
}

//Botón para avanzar a la siguiente pagina(terminos y condiciones)
btnSiguiente.addEventListener("click", async function() {

    if ( !sede.value.trim()  || !fechaSalida.value.trim()  || !fechaRegreso.value.trim()  || !codigoPc.value.trim()) {
        
        const parrafoMensaje = document.createElement("p")
        parrafoMensaje.textContent = ("* Complete todos los campos. *")
        parrafoMensaje.classList.add("mensajeError")
        mensaje.appendChild(parrafoMensaje)
        return;
    }

    const idProfesor = await asignarProfesor(sede.value);

    const solicitudTemporalEstudiante = {
        idSolitante: infoUsuario.id,
        sede: sede.value,
        fechaSalida: fechaSalida.value,
        fechaRegreso: fechaRegreso.value,
        codigoPc: codigoPc.value,
        idprofesor: idProfesor,
        estadoSolicitus: "pendiente",
        motivoRechazo: ""

    };
    
    localStorage.setItem("solicitudTemporalEstudiante",JSON.stringify(solicitudTemporalEstudiante))

    window.location.href="../pages/terminosCondiciones.html"
    
})