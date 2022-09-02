//Manipulación DOM
//Secciones
const ocultarAtaque = document.getElementById("Elige_Ataque")
const ocultarMascota = document.getElementById("Elige_mascota")
const msj = document.getElementById("pelea")

//Botones
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonLanzallamas = document.getElementById("boton-Lanzallamas")
const botonHidrobomba = document.getElementById("boton-Hidrobomba")
const botonGigadrenado = document.getElementById("boton-Gigadrenado")
const botonReiniciar = document.getElementById("reiniciar")
const spanMascotaJugador = document.getElementById("mascota-jugador")

//Variables Globales
let MascotaJugador = " "
let MascotaEnemigo = " "
let ataqueJugador = " "
let ataqueEnemigo = " "
let vidaJ = 3;
let vidaE = 3;


function iniciarJuego() {
    ocultarAtaque.style.display = 'none'
    botonReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonLanzallamas.addEventListener('click', ataqueLanzallamas)
    botonHidrobomba.addEventListener('click', ataqueHidrobomba)
    botonGigadrenado.addEventListener('click', ataqueGigadrenado)
    botonReiniciar.addEventListener('click', reiniciarJuego)
    msj.style.display = 'none';
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function seleccionarMascotaJugador() {
    ocultarMascota.style.display = 'none'
    ocultarAtaque.style.display = 'flex'
    let tarjetaJugador = document.getElementById("one")
    if (document.getElementById('Charmander').checked) {
        MascotaJugador = "Charmander";
        spanMascotaJugador.innerHTML = 'Charmander '
        tarjetaJugador.style.backgroundColor = "firebrick"        
    }
    else if (document.getElementById('Stitch').checked) {
        MascotaJugador = "Stitch";
        spanMascotaJugador.innerHTML = 'Stitch '
        tarjetaJugador.style.backgroundColor = "rgb(17, 17, 168)"
    }
    else if (document.getElementById('Hongo').checked) {
        MascotaJugador = "Hongo";
        spanMascotaJugador.innerHTML = 'Hongo '
        tarjetaJugador.style.backgroundColor = "rgb(19, 168, 19)"
    }
    else {
        alert("No seleccionaste nada")
    }
    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo() {

    let enemigo = aleatorio(1, 3)
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")
    let tarjetaEnemigo = document.getElementById("two")
    if (enemigo == 1) {
        MascotaEnemigo = "Charmander";
        spanMascotaEnemigo.innerHTML = 'Charmander '
        tarjetaEnemigo.style.backgroundColor = "firebrick"
    }
    else if (enemigo == 2) {
        MascotaEnemigo = "Stitch";
        spanMascotaEnemigo.innerHTML = 'Stitch '
        tarjetaEnemigo.style.backgroundColor = "rgb(17, 17, 168)"
    }
    else if (enemigo == 3) {
        MascotaEnemigo = "Hongo";
        spanMascotaEnemigo.innerHTML = 'Hongo '
        tarjetaEnemigo.style.backgroundColor = "rgb(19, 168, 19)"
       
    }
    else {
        alert("No seleccionaste nada")
    }
}

function ataqueLanzallamas() {
    ataqueJugador = "Lanzallamas"
    enemigo()

   
}

function ataqueHidrobomba() {
    ataqueJugador = "Hidrobomba"
    enemigo()

 
}

function ataqueGigadrenado() {
    ataqueJugador = "Gigadrenado"
    enemigo()

    
}

function enemigo() {
    let ataque = aleatorio(1, 3)
    if (ataque == 1) {
        ataqueEnemigo = "Lanzallamas"
    }
    else if (ataque == 2) {
        ataqueEnemigo = "Hidrobomba"
    }
    else if (ataque == 3) {
        ataqueEnemigo = "Gigadrenado"
    }
    combate()
    vida()
}

function combate() {
    msj.style.display = 'flex';
    let combate = document.getElementById('WOL')
    let movPl = document.getElementById('movJ')
    let movEn = document.getElementById('movE')
    combate.innerHTML = winlose();
    movPl.innerHTML =  ataqueJugador;
    movEn.innerHTML = ataqueEnemigo;
}

function winlose() {
    if (ataqueJugador == "Lanzallamas" && ataqueEnemigo == "Hidrobomba" || ataqueJugador == "Hidrobomba" && ataqueEnemigo == "Gigadrenado" || ataqueJugador == "Gigadrenado" && ataqueEnemigo == "Lanzallamas") {
        vidaJ = vidaJ - 1
        return "PERDISTE"  
    }
    if (ataqueJugador == ataqueEnemigo) {
        return "EMPATE"
    }
    else {
        vidaE = vidaE - 1
        return "GANASTE"
        
    }
}

function vida(){
    let spanVidaE = document.getElementById("vidaE")
    let spanVidaJ = document.getElementById("vidaJ")    
    let test = document.getElementById("test")   

    if(vidaE!=0 && vidaJ!=0){
        spanVidaE.innerHTML = vidaE
        spanVidaJ.innerHTML = vidaJ
    }
    else if(vidaE==0){
        alert("Fin del juego GANASTE")
        spanVidaE.innerHTML = vidaE 
        test.innerHTML = "GANASTE"
        final()
    }
    else if(vidaJ==0){
        alert("Fin del juego PERDISTE")  
        spanVidaJ.innerHTML = vidaJ
        test.innerHTML = "PERDISTE"
        final()
    }
   
}
function final(){
    botonLanzallamas.disabled = true
    botonHidrobomba.disabled = true
    botonGigadrenado.disabled = true
    botonReiniciar.style.display = 'flex'

}
function reiniciarJuego(){
    location.reload()
}



window.addEventListener('load', iniciarJuego)


