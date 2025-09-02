import { getUsuarios } from "../services/servicesRegistro.js";
import { getSolicitud } from "../services/servicesSolicitudes.js";

const tablaHistorial = document.getElementById("tablaHistorial");
const buscarEstudiante = document.getElementById("buscarEstudiante");
const fechaDesde = document.getElementById("fechaDesde");
const fechaHasta = document.getElementById("fechaHasta");
const estadoFiltro = document.getElementById("estadoFiltro");
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("btnLimpiar");
const contador = document.getElementById("contador");

// Evento del botón "Enviar" que hace toda la lógica
btnBuscar.addEventListener("click", async function() {

    // Limpiar tabla anterior
    tablaHistorial.innerHTML = "";
    contador.textContent = "";

    // Cargar datos desde los servicios
    const usuarios = await getUsuarios();
    const solicitudes = await getSolicitud();

    console.log("Usuarios cargados:", usuarios);
    console.log("Solicitudes cargadas:", solicitudes);

    // Comenzamos con todas las solicitudes
    let filtradas = solicitudes;

    // Filtrar por nombre del estudiante
    const nombreBuscar = buscarEstudiante.value.trim().toLowerCase();
    if(nombreBuscar) {
        filtradas = filtradas.filter(solicitud => {
            const estudiante = usuarios.find(u => u.id === solicitud.idSolitante);
            if(!estudiante) return false;
            const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido}`.toLowerCase();
            return nombreCompleto.includes(nombreBuscar);
        });
    }

    // Filtrar por fechas
    const desde = fechaDesde.value;
    const hasta = fechaHasta.value;
    if(desde){
        filtradas = filtradas.filter(s => s.fechaSalida >= desde);
    }
    if(hasta){
        filtradas = filtradas.filter(s => s.fechaRegreso <= hasta);
    }

    // Filtrar por estado
    const estado = estadoFiltro.value;
    if(estado){
        filtradas = filtradas.filter(s => s.estadoSolicitud.toLowerCase() === estado.toLowerCase());
    }

    // Mostrar resultados
    if(filtradas.length === 0){
        contador.textContent = "No se encontraron resultados.";
        return;
    }

    filtradas.forEach((solicitud, index) => {
        const estudiante = usuarios.find(u => u.id === solicitud.idSolitante);
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${estudiante ? estudiante.nombre + " " + estudiante.apellido : "Desconocido"}</td>
            <td>${solicitud.sede}</td>
            <td>${solicitud.fechaSalida}</td>
            <td>${solicitud.fechaRegreso}</td>
            <td>${solicitud.codigoPc}</td>
            <td>${solicitud.estadoSolicitud}</td>
            <td>${solicitud.motivoRechazo || "-"}</td>
        `;
        tablaHistorial.appendChild(fila);
    });

    contador.textContent = `Se encontraron ${filtradas.length} solicitud(es).`;
});

// Botón Limpiar (opcional)
btnLimpiar.addEventListener("click", function() {
    buscarEstudiante.value = "";
    fechaDesde.value = "";
    fechaHasta.value = "";
    estadoFiltro.value = "";
    tablaHistorial.innerHTML = "";
    contador.textContent = "";
});
