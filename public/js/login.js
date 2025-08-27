import { getRegistro } from "../services/servicesRegistro.js";

const idUser = document.getElementById("idUser");
const passUser = document.getElementById("passUser");
const btnLogin = document.getElementById("btnLogin");
const loginMensajeError = document.getElementById("loginMensajeError");

btnLogin.addEventListener("click", async function () {
    const usuarios = await getRegistro();

    for (let index = 0; index < usuarios.length; index++) {
        if (
            usuarios[index].userName === idUser.value.trim() &&
            usuarios[index].contrasenha === passUser.value.trim()
        ) {
            //Si hay una concidencia inicia sesión esn estudiante
            window.location.href = "../pages/solicitudesEstudiantes.html";
            return;
        }
    }

    loginMensajeError.classList.remove("oculto");
});

