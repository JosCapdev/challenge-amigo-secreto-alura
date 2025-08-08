let amigos = []

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function condicionesIniciales() {
    asignarTextoElemento('h2', 'Digite el nombre de sus amigos');
}

function limpiarCampo(){
    document.querySelector('#amigo').value = '';
}

function agregarAmigo(){
    let amigo = document.getElementById('amigo').value;
    if(amigo !== ''){
        if(amigos.includes(amigo)){
            asignarTextoElemento('h2','El nombre ya fue ingresado,intente ingresar otro :)');
            limpiarCampo();
        }else{
            amigos.push(amigo);
            limpiarCampo();
            condicionesIniciales();
            actualizarLista();
        }
    }else{
        alert("Por favor, inserte un nombre.");
    }
}

function limpiarLista() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
}

function agregarAmigoALista(amigo) {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML += `<li>${amigo}</li>`;
}


function actualizarLista() {
    let lista = document.getElementById('listaAmigos');
    limpiarLista();
    for (let amigo of amigos) {
         agregarAmigoALista(amigo);
    }
}

function sortearAmigo(){
    condicionesIniciales();
    if(amigos.length === 0){
        asignarTextoElemento('h2', 'No hay amigos en la lista. Por favor, agrega algunos amigos antes de sortear.');
    }else{
        let indiceAleatorio = Math.floor(Math.random() * amigos.length);
        let amigoSorteado = amigos[indiceAleatorio];
        asignarTextoElemento('#resultado', 'El amigo sorteado es: ' + amigoSorteado);
    }
}