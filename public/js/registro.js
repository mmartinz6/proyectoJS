import { getUsuarios, postUsuarios } from "../services/servicesRegistro.js";

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido")
const emailUsuario = document.getElementById("emailUsuario");
const telefono = document.getElementById("telefono");
const usuario = document.getElementById("usuario");
const contrasenha = document.getElementById("contrasenha");
const btnRegistrarse = document.getElementById("btnRegistrarse");
const mensajes = document.getElementById("mensajes");
const btnCancelar = document.getElementById("btnCancelar");

btnRegistrarse.addEventListener("click", async function() {
    if(!nombre.value.trim() || !apellido.value.trim() || !emailUsuario.value.trim() || !telefono.value.trim() || !usuario.value.trim()
        || !contrasenha.value.trim()){
        
            const parrafoMensaje = document.createElement("p")
            parrafoMensaje.textContent = ("* Complete todos los campos. *")
            parrafoMensaje.classList.add("mensajeError")
            mensajes.appendChild(parrafoMensaje)

        return;
    }
    //lista de dominios permitidos
    let listaCorreos = ["fwd", "forward", "gmail"]

    const verificacion = emailUsuario.value.includes("@")
    const verificacion2 = emailUsuario.value.includes(".com")
    let verificacion3 = false

    for (let index = 0; index < listaCorreos.length; index++) {
        const element = listaCorreos[index];

        verificacion3 = emailUsuario.value.includes(element)
        
    }

    if (verificacion && verificacion2 && verificacion3) {
        const usuarioExistente = await getUsuarios();
        const usuarioRepetido = usuarioExistente.filter(usuarioExistente => usuarioExistente.userName.toLowerCase() === usuario.value.toLowerCase());
        
        if (usuarioRepetido.length > 0) {
            const parrafoMensaje = document.createElement("p");
            parrafoMensaje.textContent = ("* Usuario ya existe. *");
            parrafoMensaje.classList.add("mensajeError");
            mensajes.appendChild(parrafoMensaje);
            return;
        }

        const usuarioNuevo ={
            nombre:nombre.value,
            apellido:apellido.value,
            email:emailUsuario.value,
            telefono:telefono.value,
            userName:usuario.value,
            contrasenha:contrasenha.value,
            rol: "estudiante"

        };
    
        const respuestaConfirmada = await postUsuarios(usuarioNuevo)

        console.log(respuestaConfirmada);

        window.location.href = "../pages/login.html";
        
    } else{
        console.log("DIGITAA UN EMAIL ALV");
    }
})

//Boton para volver a la pantalla de Login 
btnCancelar.addEventListener("click",function() {

    window.location.href = "../pages/login.html";
});
 
