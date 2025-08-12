let amigos = [];
let amigosYaSorteados = [];
let amigosYaSeleccionados = [];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function condicionesIniciales() {
    asignarTextoElemento('h2', 'Digite el nombre de sus amigos');
    document.querySelector('#reiniciar').setAttribute('disabled', true);
    asignarTextoElemento('#resultado', ``);
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
    lista.innerHTML += `
        <li class="amigo-item">
            <div class="amigo-bloque">
                ${amigo}
            </div>
        </li>
    `;
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
    }else if(amigos.length % 2 === 1){
        asignarTextoElemento('h2', 'Se necesitan un número par de amigos para los regalos.');
        desbloqueoDeBotones();
    }else if(amigos.length !== amigosYaSorteados.length){
        let indiceAleatorio = Math.floor(Math.random() * amigos.length);
        let amigoSorteado = amigos[indiceAleatorio];
    
        if(amigosYaSorteados.includes(amigoSorteado)){
           return sortearAmigo();
        }else{
            for (let amigo of amigos) {
              if(amigo !== amigoSorteado && !amigosYaSeleccionados.includes(amigo)){
                amigosYaSorteados.push(amigoSorteado);
                amigosYaSeleccionados.push(amigo);
                asignarTextoElemento('h2', `Amigo ${amigo} preparate!`);
                document.getElementById('sortear').setAttribute('disabled', true);
                const boton = document.querySelector('#boton-confirmar');
                boton.style.display = 'block'; // Mostrar el botón
                // Esperar a que el usuario haga clic
                boton.onclick = () => {
                mostrarResultadoBonito(amigo, amigoSorteado); 
                boton.style.display = 'none'; // Ocultar el botón después
                document.getElementById('sortear').removeAttribute('disabled', true);//activar boton
                };
                break;
                }
            }
        }
    }else{
        asignarTextoElemento('h2', 'Ya se sortearon todos los Amigos!');
        document.getElementById('sortear').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled', true);
    }
}

function bloqueoDeBotonesXComienzoSorteo(){
    asignarTextoElemento('h2', 'Comienzo del Sorteo!');
    document.getElementById('amigo').setAttribute('disabled', true);
    document.getElementById('agregar').setAttribute('disabled', true);
    document.querySelector('.input-wrapper').style.display = 'none';
}

function desbloqueoDeBotones(){
    document.getElementById('amigo').removeAttribute('disabled', true);
    document.getElementById('agregar').removeAttribute('disabled', true);
    document.querySelector('.input-wrapper').style.display = 'flex';
}

function reiniciarJuego() {
    amigos = [];
    amigosYaSorteados = [];
    amigosYaSeleccionados = [];
    limpiarCampo();
    limpiarLista();
    condicionesIniciales();
    desbloqueoDeBotones();
    document.getElementById('sortear').removeAttribute('disabled', true); 
}

function mostrarResultadoBonito(amigo, amigoSorteado) {
  const lista = document.getElementById('resultado');
  const li = document.createElement('li');
  li.textContent = `🎁 El amigo secreto de ${amigo} es: ${amigoSorteado}!`;
  lista.appendChild(li);
}
