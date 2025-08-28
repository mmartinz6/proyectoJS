
const nombreUsuario = document.getElementById("nombreUsuario");
const sede = document.getElementById("sede");
const fechaSalida = document.getElementById("fechaSalida");
const fechaRegreso = document.getElementById("fechaRegreso")
const codigoPc = document.getElementById("codigoPc");
/* const condiciones = document.getElementById("condiciones"); */
const btnEnviarSolicitud = document.getElementById("btnEnviarSolicitud");


btnEnviarSolicitud.addEventListener("click", async function() {

    const solicitudEstudiante ={
        sede:sede.value,
        fechaSalida:fechaSalida.value,
        fechaRegreso: fechaRegreso.value,
        codigoPc: fechaRegreso,
    }
    
    const respuestaConfirmada = await potUsers(solicitudEstudiante)

    console.log(respuestaConfirmada);
    
})