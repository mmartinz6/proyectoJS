import { getSolicitud } from "../services/servicesSolicitudes.js";
import { getUsuarios } from "../services/servicesRegistro.js";

const buscarEstudiante = document.getElementById("buscarEstudiante");
const fechaDesde = document.getElementById("fechaDesde");
const fechaHasta = document.getElementById("fechaHasta");
const estadoFiltro = document.getElementById("estadoFiltro");
const btnLimpiar = document.getElementById("btnLimpiar");

const tablaHistorial = document.getElementById("tablaHistorial");
const contador = document.getElementById("contador");

// Cache en memoria para no pedir al servidor en cada filtro
let historialEnriquecido = [];

// 1) GET al servidor y enriquecer con nombre del estudiante
const cargarHistorial = async function () {
  const solicitudes = await getSolicitud();
  const usuarios = await getUsuarios();

  // Mapea cada solicitud agregando el nombre completo del estudiante
  historialEnriquecido = solicitudes.map(function (solicitud) {
    const estudiante = usuarios.find(function (usuario) {
      return usuario.id === solicitud.idSolitante; // ojo: tu campo es idSolitante
    });

    const nombreEstudiante = estudiante
      ? estudiante.nombre + " " + estudiante.apellido
      : "Estudiante desconocido";

    return {
      ...solicitud,
      nombreEstudiante: nombreEstudiante
    };
  });

  renderizar(historialEnriquecido);
};

// 2) Generar HTML con map
function renderizar(lista) {
  if (!lista || lista.length === 0) {
    tablaHistorial.innerHTML = "";
    contador.textContent = "No hay solicitudes para mostrar.";
    return;
  }

  const filas = lista
    .map(function (item) {
      return `
        <tr>
          <td>${item.nombreEstudiante}</td>
          <td>${item.sede || ""}</td>
          <td>${item.fechaSalida || ""}</td>
          <td>${item.fechaRegreso || ""}</td>
          <td>${item.codigoPc || ""}</td>
          <td>${item.estadoSolicitus || ""}</td>
          <td>${item.motivoRechazo || ""}</td>
        </tr>
      `;
    })
    .join("");

  tablaHistorial.innerHTML = filas;
  contador.textContent = "Mostrando " + lista.length + " solicitud(es).";
}

// 3) Filtros con filter (por estudiante, fecha y estado)
function aplicarFiltros() {
  const texto = buscarEstudiante.value.trim().toLowerCase();
  const estado = estadoFiltro.value;
  const desde = fechaDesde.value ? new Date(fechaDesde.value) : null;
  const hasta = fechaHasta.value ? new Date(fechaHasta.value) : null;

  const listaFiltrada = historialEnriquecido.filter(function (item) {
    // Estudiante
    const coincideNombre = texto
      ? item.nombreEstudiante.toLowerCase().includes(texto)
      : true;

    // Estado
    const coincideEstado = estado ? item.estadoSolicitus === estado : true;

    // Fecha: usamos fechaSalida para el rango
    const fechaItem = item.fechaSalida ? new Date(item.fechaSalida) : null;
    const coincideFecha =
      desde || hasta
        ? (desde ? (fechaItem && fechaItem >= desde) : true) &&
          (hasta ? (fechaItem && fechaItem <= hasta) : true)
        : true;

    return coincideNombre && coincideEstado && coincideFecha;
  });

  renderizar(listaFiltrada);
}

// Listeners de filtros
buscarEstudiante.addEventListener("input", aplicarFiltros);
estadoFiltro.addEventListener("change", aplicarFiltros);
fechaDesde.addEventListener("change", aplicarFiltros);
fechaHasta.addEventListener("change", aplicarFiltros);

btnLimpiar.addEventListener("click", function () {
  buscarEstudiante.value = "";
  fechaDesde.value = "";
  fechaHasta.value = "";
  estadoFiltro.value = "";
  renderizar(historialEnriquecido);
});

// Inicializar
cargarHistorial();
