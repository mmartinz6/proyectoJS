
const btnLogout = document.getElementById("btnLogout")





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
 