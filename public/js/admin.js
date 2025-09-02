
const btnLogout = document.getElementById("btnLogout")


const infoProfesor = JSON.parse(localStorage.getItem("userlog"));

// Crear mensaje de bienvenida
if (infoProfesor && infoProfesor.rol === "profesor") {
    const parrafoBienvenida = document.createElement("p");
    parrafoBienvenida.textContent = "¡Bienvenido/a, " + infoProfesor.nombre + " " + infoProfesor.apellido + "!";
    parrafoBienvenida.classList.add("bienvenidoMensaje"); // Puedes usar una clase CSS para estilo
    mensajeBienvenida.appendChild(parrafoBienvenida);
}

//Boton para volver a la pantalla de Login 
btnLogout.addEventListener("click",function() {

    const confirmacion = window.confirm("¿Estás seguro de que deseas cerrar sesión?");

     if (confirmacion) {
        // Si el usuario acepta, redirige al login
        window.location.href = "../pages/login.html";
    } else {
        // Si cancela, no hace nada
        return;
    }
});
 