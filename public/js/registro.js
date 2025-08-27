import { getRegistro, postRegistro } from "../services/servicesRegistro.js";

const nomCompleto = document.getElementById("nomCompleto");
const emailUsuario = document.getElementById("emailUsuario");
const telefono = document.getElementById("telefono");
const usuario = document.getElementById("usuario");
const contrasenha = document.getElementById("contrasenha");
const btnRegistrarse = document.getElementById("btnRegistrarse");
const mensajeError = document.getElementById("mensajeError")

btnRegistrarse.addEventListener("click", async function() {
    if(!nomCompleto.value.trim() || !emailUsuario.value.trim() || !telefono.value.trim() || !usuario.value.trim()
        || !usuario.value.trim() || !contrasenha.value.trim()){
        alert("❌Complete todos los campos❌")
        return;
    }

    mensajeError.style.display = "none";

    const usuarioNuevo ={
        nombre:nomCompleto.value,
        email:emailUsuario.value,
        telefono:telefono.value,
        userName:usuario.value,
        contrasenha:contrasenha.value,
        rol: "estudiante"

    };
    
    const respuestaConfirmada = await postRegistro(usuarioNuevo)

    console.log(respuestaConfirmada);
    
})
 
