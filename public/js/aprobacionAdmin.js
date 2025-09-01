import { getSolicitud, putSolicitud } from "../services/servicesSolicitudes.js";
import { getUsuarios } from "../services/servicesRegistro.js";

const listaPendientes = document.getElementById("listaPendientes");
const infoProfesor = JSON.parse(localStorage.getItem("userlog"));

const cargarSolicitudes = async function() {
    listaPendientes.innerHTML = "";

    const todasSolicitudes = await getSolicitud();
    const usuarios = await getUsuarios();

    // Filtra solo solicitudes pendientes de este profesor
    const solicitudesProfesor = todasSolicitudes.filter(solicitud => 
        solicitud.idprofesor === infoProfesor.id && solicitud.estadoSolicitus === "pendiente"
    );

    if (solicitudesProfesor.length === 0) {
        const sinSolicitudes = document.createElement("p");
        sinSolicitudes.textContent = "No hay solicitudes pendientes";
        listaPendientes.appendChild(sinSolicitudes);
        return;
    }

    solicitudesProfesor.forEach(solicitud => {
        const estudiante = usuarios.find(usuario => usuario.id === solicitud.idSolitante);
        const nombreEstudiante = estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : "Estudiante desconocido";

        // Contenedor de solicitud
        const divSolicitud = document.createElement("div");
        divSolicitud.classList.add("solicitud");

        // Información del estudiante
        const pNombre = document.createElement("p");
        pNombre.textContent = "Estudiante: " + nombreEstudiante;
        divSolicitud.appendChild(pNombre);

        // Contenedor para mensajes
        const mensajesSolicitud = document.createElement("div");
        divSolicitud.appendChild(mensajesSolicitud);

        // Botón Aceptar
        const btnAceptar = document.createElement("button");
        btnAceptar.textContent = "Aceptar";
        btnAceptar.addEventListener("click", async () => {
            const solicitudActualizada = {
                ...solicitud,
                estadoSolicitus: "aprobada",
                motivoRechazo: ""
            };
            await putSolicitud(solicitudActualizada, solicitud.id);
            mensajesSolicitud.textContent = "Solicitud aprobada";
            await cargarSolicitudes(); // Recargar lista
        });
        divSolicitud.appendChild(btnAceptar);

        // Botón Rechazar
        const btnRechazar = document.createElement("button");
        btnRechazar.textContent = "Rechazar";
        btnRechazar.addEventListener("click", () => {
            mensajesSolicitud.innerHTML = "";

            const labelMotivo = document.createElement("p");
            labelMotivo.textContent = "Escriba el motivo del rechazo:";

            const textareaMotivo = document.createElement("textarea");
            textareaMotivo.rows = 3;
            textareaMotivo.cols = 30;

            const btnEnviarMotivo = document.createElement("button");
            btnEnviarMotivo.textContent = "Enviar";

            btnEnviarMotivo.addEventListener("click", async () => {
                const motivo = textareaMotivo.value.trim();
                if (!motivo) {
                    const alerta = document.createElement("p");
                    alerta.textContent = "Debe escribir un motivo.";
                    mensajesSolicitud.appendChild(alerta);
                    return;
                }

                // Actualizar solo estado y motivo, manteniendo todo lo demás
                const solicitudActualizada = {
                    ...solicitud,
                    estadoSolicitus: "rechazada",
                    motivoRechazo: motivo
                };
                await putSolicitud(solicitudActualizada, solicitud.id);
                mensajesSolicitud.textContent = "Solicitud rechazada";
                await cargarSolicitudes(); // Recargar lista
            });

            mensajesSolicitud.appendChild(labelMotivo);
            mensajesSolicitud.appendChild(textareaMotivo);
            mensajesSolicitud.appendChild(btnEnviarMotivo);
        });
        divSolicitud.appendChild(btnRechazar);

        listaPendientes.appendChild(divSolicitud);
    });
};

cargarSolicitudes();
