import { getUsuarios, postUsuarios } from "../services/servicesRegistro.js";

const nomCompleto = document.getElementById("nomCompleto");
const emailUsuario = document.getElementById("emailUsuario");
const telefono = document.getElementById("telefono");
const usuario = document.getElementById("usuario");
const contrasenha = document.getElementById("contrasenha");
const btnRegistrarse = document.getElementById("btnRegistrarse");
const mensajes = document.getElementById("mensajes");
const btnVolver = document.getElementById("btnVolver");

btnRegistrarse.addEventListener("click", async function() {
    if(!nomCompleto.value.trim() || !emailUsuario.value.trim() || !telefono.value.trim() || !usuario.value.trim()
        || !contrasenha.value.trim()){
        
            const parrafoMensaje = document.createElement("p")
            parrafoMensaje.textContent = ("* Complete todos los campos. *")
            parrafoMensaje.classList.add("mensajeError")
            mensajes.appendChild(parrafoMensaje)

        return;
    }

    let listaCorreos = ["fwd", "forward", "gmail"]

    const verificacion = emailUsuario.value.includes("@")
    const verificacion2 = emailUsuario.value.includes(".com")
    let verificacion3 = false

    for (let index = 0; index < listaCorreos.length; index++) {
        const element = listaCorreos[index];

        verificacion3 = emailUsuario.value.includes(element)
        
    }

    if (verificacion === true && verificacion2 === true && verificacion3 === true) {
        console.log(verificacion);
        const usuarioNuevo ={
            nombre:nomCompleto.value,
            email:emailUsuario.value,
            telefono:telefono.value,
            userName:usuario.value,
            contrasenha:contrasenha.value,
            rol: "estudiante"

        };
    
        const respuestaConfirmada = await postUsuarios(usuarioNuevo)

        console.log(respuestaConfirmada);
    } else{
        console.log("DIGITAAA UN EMAIL CORRECTOOO ALV");
    }
})

//Boton para volver a la pantalla de Login 
btnVolver.addEventListener("click",function() {

    window.location.href = "../pages/login.html";
});
 
