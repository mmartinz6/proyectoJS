import { getUsuarios } from "../services/servicesRegistro.js";

const idUser = document.getElementById("idUser");
const passUser = document.getElementById("passUser");
const btnLogin = document.getElementById("btnLogin");
const loginMensajeError = document.getElementById("loginMensajeError");

btnLogin.addEventListener("click", async function () {
    const usuarios = await getUsuarios();

    for (let index = 0; index < usuarios.length; index++) {
        const usuario = usuarios[index];

        const usernameCorrecto = usuario.userName === idUser.value.trim();
        const passwordCorrecta = usuario.contrasenha === passUser.value.trim();

        if (usernameCorrecto && passwordCorrecta) {
            // Verificar el rol del usuario y redirigir según corresponda
            if (usuario.rol === "admin" || usuario.rol === "profesor") {
                window.location.href = "../pages/admin.html";
            } else if (usuario.rol === "estudiante") {
                window.location.href = "../pages/solicitudesEstudiantes.html";
            } else {
                console.warn("Rol no reconocido:", usuario.rol);
                loginMensajeError.textContent = "Rol de usuario no válido.";
                loginMensajeError.classList.remove("oculto");
            }
            return;
        }
    }

    // Si no encontró ningún usuario válido
    loginMensajeError.textContent = "Usuario o contraseña incorrectos.";
    loginMensajeError.classList.remove("oculto");
});


