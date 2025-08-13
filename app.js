let amigos = [];
let amigoRegalador;
let amigosYaSorteados = [];
let amigosYaSeleccionados = [];

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}
// Restaura el titulo, bloquea el boton nuevo juego y borra la lista <li> del resultado del amigo secreto
function condicionesIniciales() {
    asignarTextoElemento('h2', 'Digite el nombre de sus amigos');
    document.querySelector('#reiniciar').setAttribute('disabled', true);
    asignarTextoElemento('#resultado', ``);
}
// Limpia el campo donde ingresan los nombres de los amigos
function limpiarCampo(){
    document.querySelector('#amigo').value = '';
}
// Agrega amigo al Array amigos verificando que no ingresen repetidos ni en blanco
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
// Limpia la lista para que no hayan repeticiones
function limpiarLista() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    asignarTextoElemento('#resultado','')
}
// Agrega amigos a la lista <li>
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
//Actualiza lista donde se visualizan los amigos ingresados
function actualizarLista() {
    let lista = document.getElementById('listaAmigos');
    limpiarLista();
    for (let amigo of amigos) {
         agregarAmigoALista(amigo);
    }
}

function sortearAmigo(){
    condicionesIniciales();
    // Bloquea barra y botones para agregar amigos por comienzo del sorteo
    bloqueoDeBotonesXComienzoSorteo();
    // Verifica que hayan ingresado amigos y que sean pares por los regalos
    if (amigos.length === 0) {
        asignarTextoElemento('h2', 'No hay suficientes amigos para sortear.');
        desbloqueoDeBotones();
        return;
    } else if (amigos.length % 2 === 1) {
        asignarTextoElemento('h2', 'Se necesita un número par de amigos para el sorteo.');
        desbloqueoDeBotones();
        return;
    }

    //Sortea un amigo y lo asigna a amigoSorteado
    let indiceAleatorio = Math.floor(Math.random() * amigos.length);
    let amigoSorteado = amigos[indiceAleatorio];
    
    // Verifica si ya estan todos los amigos sorteados
    if (amigos.length === amigosYaSorteados.length) {
        asignarTextoElemento('h2', 'Ya se sortearon todos los Amigos!');
        // Bloquea boton de sortear por que ya se sortearon todos los amigos
        document.getElementById('sortear').setAttribute('disabled', true);
        // Desbloquea el boton nuevo juego
        document.getElementById('reiniciar').removeAttribute('disabled', true);
        return;
    }

    // Si el amigo sorteado ya fue sorteado vuelve a comenzar
    if(amigosYaSorteados.includes(amigoSorteado)){
           return sortearAmigo();
        }

    // Asigna amigo regalador sin repetir amigoRegalador y que no sea el mismo
    amigoRegalador = amigos[Math.floor(Math.random() * amigos.length)];
    while (amigoRegalador === amigoSorteado || amigosYaSeleccionados.includes(amigoRegalador)) {
        let candidato = amigos[Math.floor(Math.random() * amigos.length)];
        amigoRegalador = candidato;
    }

    // Agregar a lista de amigos ya sorteados el nuevo sorteado
    amigosYaSorteados.push(amigoSorteado);

    // Agregar a lista de amigos que regalan el nuevo amigo regalador
    amigosYaSeleccionados.push(amigoRegalador);

    // Avisa a que amigo se le va a asignar un amigo secreto
    asignarTextoElemento('h2', `¡Amigo ${amigoRegalador} preparate!`);

    // Se bloquea el boton sortear 
    document.getElementById('sortear').setAttribute('disabled', true);

    // Se confirma si esta listo el amigo que se le va asignar un amigo secreto
    const boton = document.querySelector('#boton-confirmar');
    boton.style.display = 'block'; // Mostrar el botón

    // Esperar a que el amigo haga clic
    boton.onclick = () => {
        mostrarResultadoBonito(amigoRegalador, amigoSorteado);
        boton.style.display = 'none'; // Ocultar el botón después
        document.getElementById('sortear').removeAttribute('disabled', true);//activar boton
    };
}

// Bloquea botones de agregar amigos y desaparece la barra de agregar por comienzo del sorteo
function bloqueoDeBotonesXComienzoSorteo(){
    asignarTextoElemento('h2', 'Comienzo del Sorteo!');
    document.getElementById('amigo').setAttribute('disabled', true);
    document.getElementById('agregar').setAttribute('disabled', true);
    document.querySelector('.input-wrapper').style.display = 'none';
}

// Desbloquea y hace aparecer botones y barra para agregar amigos
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

//Muestra el resultado del amigo secreto
function mostrarResultadoBonito(amigo, amigoSorteado) {
  const lista = document.getElementById('resultado');
  const li = document.createElement('li');
  li.textContent = `🎁 El amigo secreto de ${amigo} es: ${amigoSorteado}!`;
  lista.appendChild(li);
}
