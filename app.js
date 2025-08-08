let amigos = [];
let amigosYaSorteados = [];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function condicionesIniciales() {
    asignarTextoElemento('h2', 'Digite el nombre de sus amigos');
    document.querySelector('#reiniciar').setAttribute('disabled', true);
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
    asignarTextoElemento('#resultado','')
}

function agregarAmigoALista(amigo) {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML += `<li> - ${amigo}</li>`;
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
    bloqueoDeBotonesXComienzoSorteo();
    if(amigos.length === 0){
        asignarTextoElemento('h2', 'No hay amigos en la lista. Por favor, agrega algunos amigos antes de sortear.');
    }else if(amigos.length < 3){
        asignarTextoElemento('h2', 'Se necesitan al menos 3 amigos para realizar el sorteo.')
    }else if(amigos.length !== amigosYaSorteados.length){
        let indiceAleatorio = Math.floor(Math.random() * amigos.length);
        let amigoSorteado = amigos[indiceAleatorio];
        
        if(amigosYaSorteados.includes(amigoSorteado)){
           return sortearAmigo();
        }else{
            amigosYaSorteados.push(amigoSorteado);
            asignarTextoElemento('#resultado', 'El amigo sorteado es: ' + amigoSorteado);
        }
    }else{
        asignarTextoElemento('h2', 'Ya se sortearon todos los Amigos!');
        document.getElementById('sortear').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled', true);
    }
}

function bloqueoDeBotonesXComienzoSorteo(){
    document.getElementById('amigo').setAttribute('disabled', true);
    document.getElementById('agregar').setAttribute('disabled', true);
}

function desbloqueoDeBotones(){
    document.getElementById('amigo').removeAttribute('disabled', true);
    document.getElementById('agregar').removeAttribute('disabled', true);
}

function reiniciarJuego() {
    amigos = [];
    amigosYaSorteados = [];
    limpiarCampo();
    limpiarLista();
    condicionesIniciales();
    desbloqueoDeBotones();
    document.getElementById('sortear').removeAttribute('disabled', true); 
}