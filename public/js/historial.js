import { getSolicitud } from "../services/servicesSolicitudes.js";
import { getUsuarios } from "../services/servicesRegistro.js";

const buscarEstudiante = document.getElementById("buscarEstudiante");
const fechaDesde = document.getElementById("fechaDesde");
const fechaHasta = document.getElementById("fechaHasta");
const estadoFiltro = document.getElementById("estadoFiltro");
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("btnLimpiar");

const tablaHistorial = document.getElementById("tablaHistorial");
const contador = document.getElementById("contador");

btnBuscar.addEventListener("click", async function () {
  tablaHistorial.innerHTML = "";
  contador.textContent = "";

  try {
    // 1) Obtener solicitudes y usuarios
    const solicitudes = await getSolicitud();
    const usuarios = await getUsuarios();

    // 2) Enriquecer solicitudes con nombre completo del estudiante
    const historialSolicitudes = solicitudes
      .map(solicitud => {
        const estudiante = usuarios.find(u => u.id === solicitud.idSolitante);
        if (!estudiante) return null;
        return {
          ...solicitud,
          nombreEstudiante: estudiante.nombre + " " + estudiante.apellido
        };
      })
      .filter(item => item !== null);

    // 3) Obtener valores de filtros
    const texto = buscarEstudiante.value.trim().toLowerCase();
    const estado = estadoFiltro.value;
    const desde = fechaDesde.value ? new Date(fechaDesde.value) : null;
    const hasta = fechaHasta.value ? new Date(fechaHasta.value) : null;

    // 4) Filtrar solicitudes solo si hay filtros activos
    const filtradas = historialSolicitudes.filter(item => {
      let nombreMatch = true;
      if (texto.length > 0) {
        nombreMatch = item.nombreEstudiante.toLowerCase().includes(texto);
      }

      let estadoMatch = true;
      if (estado.length > 0) {
        estadoMatch = item.estadoSolicitus === estado;
      }

      let fechaMatch = true;
      if (desde || hasta) {
        const fechaItem = item.fechaSalida ? new Date(item.fechaSalida) : null;
        if (desde && (!fechaItem || fechaItem < desde)) fechaMatch = false;
        if (hasta && (!fechaItem || fechaItem > hasta)) fechaMatch = false;
      }

      return nombreMatch && estadoMatch && fechaMatch;
    });

    // 5) Mostrar resultados
    if (filtradas.length === 0) {
      tablaHistorial.innerHTML = "<tr><td colspan='8'>No hay solicitudes para mostrar.</td></tr>";
      contador.textContent = "Mostrando 0 solicitudes.";
      return;
    }

    let filasHtml = "";
    filtradas.forEach((item, index) => {
      filasHtml += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${item.nombreEstudiante}</td>
        <td>${item.sede || ""}</td>
        <td>${item.fechaSalida || ""}</td>
        <td>${item.fechaRegreso || ""}</td>
        <td>${item.codigoPc || ""}</td>
        <td>${item.estadoSolicitus || ""}</td>
        <td>${item.motivoRechazo || ""}</td>
      </tr>`;
    });

    tablaHistorial.innerHTML = filasHtml;
    contador.textContent = "Mostrando " + filtradas.length + " solicitud(es).";

  } catch (error) {
    console.error("Error al obtener solicitudes o usuarios", error);
    tablaHistorial.innerHTML = "<tr><td colspan='8'>Error al cargar datos.</td></tr>";
    contador.textContent = "";
  }
});

// Limpiar filtros
btnLimpiar.addEventListener("click", function () {
  buscarEstudiante.value = "";
  fechaDesde.value = "";
  fechaHasta.value = "";
  estadoFiltro.value = "";
  tablaHistorial.innerHTML = "";
  contador.textContent = "";
});

