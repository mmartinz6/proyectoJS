import { getSolicitud, putSolicitud } from "../services/servicesSolicitudes.js";
import { getUsuarios } from "../services/servicesRegistro.js";

const listaPendientes = document.getElementById("listaPendientes");
const infoProfesor = JSON.parse(localStorage.getItem("userlog"));

const cargarSolicitudes = async function() {
    listaPendientes.innerHTML = "";

    const todasSolicitudes = await getSolicitud();
    const usuarios = await getUsuarios();

    // Filtra solo solicitudes pendientes del profesor seleccionado
    const solicitudesProfesor = todasSolicitudes.filter(solicitud => 
        solicitud.idprofesor === infoProfesor.id && solicitud.estadoSolicitud === "pendiente"
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

        const divBotones = document.createElement("div")
        divBotones.classList.add("div-Botones")

        // Botón Aceptar
        const btnAceptar = document.createElement("button");
        btnAceptar.textContent = "Aceptar";
        btnAceptar.classList.add("btn-Aceptar")

        btnAceptar.addEventListener("click", async function() {
            const solicitudActualizada = {
                ...solicitud,
                estadoSolicitud: "aprobada",
                motivoRechazo: ""
            };
            await putSolicitud(solicitudActualizada, solicitud.id);
            mensajesSolicitud.textContent = "Solicitud aprobada";
            await cargarSolicitudes();
        });
        divSolicitud.appendChild(btnAceptar);

        // Botón Rechazar
        const btnRechazar = document.createElement("button");
        btnRechazar.textContent = "Rechazar";
        btnRechazar.classList.add("btn-Rechazar")

        btnRechazar.addEventListener("click", function() {
            mensajesSolicitud.innerHTML = "";

            const labelMotivo = document.createElement("p");
            labelMotivo.textContent = "Escriba el motivo del rechazo:";

            const textareaMotivo = document.createElement("textarea");
            textareaMotivo.rows = 3;
            textareaMotivo.cols = 30;

            const btnEnviarMotivo = document.createElement("button");
            btnEnviarMotivo.textContent = "Enviar";
            btnEnviarMotivo.classList.add("btn-enviar");

            btnEnviarMotivo.addEventListener("click", async function() {
                const divMotivo = document.createElement("div");
                divMotivo.classList.add("div-Motivo");
                
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
                    estadoSolicitud: "rechazada",
                    motivoRechazo: motivo
                };
                await putSolicitud(solicitudActualizada, solicitud.id);
                mensajesSolicitud.textContent = "Solicitud rechazada";
                await cargarSolicitudes();
            });

            const divMotivo = document.createElement("div");
            divMotivo.classList.add("div-motivo")

            divMotivo.appendChild(textareaMotivo);
            divMotivo.appendChild(btnEnviarMotivo);

            mensajesSolicitud.appendChild(labelMotivo);
            mensajesSolicitud.appendChild(divMotivo);
        });

        divBotones.appendChild(btnAceptar);
        divBotones.appendChild(btnRechazar);

        divSolicitud.appendChild(divBotones);

        listaPendientes.appendChild(divSolicitud);

    });
};

cargarSolicitudes();
