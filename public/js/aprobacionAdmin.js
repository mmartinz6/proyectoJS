import { getSolicitud, postSolicitud } from "../services/servicesSolicitudes.js";


const listaPendientes = document.getElementById("listaPendientes");
const mensajes = document.getElementById("mensajes")

const infoProfesor = JSON.parse(localStorage.getItem("userlog"));

const cargarSolicitudes = async function() {
    const todasSolicitudes = await getSolicitud();
    //Filtra solo las solicitudes pendientes asignadas a este profesor
    const solicitudesProfesor = todasSolicitudes.filter(solicitud =>
        solicitud.idprofesor === infoProfesor.id && solicitud.estadoSolicitus === "pendiente"
    );

    
}
