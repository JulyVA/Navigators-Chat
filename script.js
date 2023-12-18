if(navigator.serviceWorker){
    navigator.serviceWorker.register("sw.js");
}
"use strict";
const mensajes=document.querySelector(".mensajes");
const texto=document.querySelector(".texto");
const enviar=document.querySelector(".enviar");
let envio=0;

enviar.addEventListener("click",()=>{
    enviarMensaje();
});
texto.addEventListener("keydown",(e)=>{
    if (e.key === "Enter"){
        enviarMensaje();
    }
});

const enviarMensaje=()=>{
    mensajes.scrollTop = mensajes.scrollHeight;
    if(texto.value){
        envio=1;
        const mensaje = document.createElement('div');
        mensaje.classList.add("mensaje-enviado");
        mensaje.textContent=texto.value;
        mensajes.appendChild(mensaje);
        texto.value="";
        navigator.serviceWorker.ready.then(res=>res.active.postMessage(mensaje.textContent));
    }
};

navigator.serviceWorker.addEventListener("message",msg=>{
    mensajes.scrollTop = mensajes.scrollHeight;
    if(!envio){
        const mensaje = document.createElement('div');
        mensaje.classList.add("mensaje-recibido");
        mensaje.textContent=msg.data;
        mensajes.appendChild(mensaje);
    }
    envio=0;
});