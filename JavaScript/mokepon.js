//Manipulación DOM
//Secciones
const ocultarAtaque = document.getElementById("Elige_Ataque")
const ocultarMascota = document.getElementById("Elige_mascota")
const msj = document.getElementById("pelea")
const verMapa = document.getElementById("verMapa")
//Botones
const botonMascotaJugador = document.getElementById("boton-mascota")

const botonReiniciar = document.getElementById("reiniciar")
const spanMascotaJugador = document.getElementById("mascota-jugador")

//Divs
const divTarjeta = document.getElementById("divTarjetas")
const divAtaque = document.getElementById("divAtaques")

const mapa = document.getElementById("mapa")

//Variables Globales
let jugadorId = null
let mokepones = []
let MascotaJugador = " "
let MascotaEnemigo = " "
let ataqueJugador = []
let ataqueEnemigo = []
let vidaJ = 3;
let vidaE = 3;
let opcionDeMokepones = " "
let ataquesMokepon = " "
let botonLanzallamas
let botonHidrobomba
let botonGigadrenado
let botones = []
let indexAtaqueJugador = []
let indexAtaqueEnemigo = []
let mapaBG = new Image()
mapaBG.src = "./imagenes/mapa.png"
let miMokepon = []
let vicJ = 0;
let vicE = 0;
let combate = false;
let lienzo = mapa.getContext('2d')
let intervalo
let alturaBuscada 
let anchoMapa = window.innerWidth - 20
const anchoMaximo = 600

if(anchoMapa>anchoMaximo){
    anchoMapa = anchoMaximo - 20
}
alturaBuscada= anchoMapa * 600 / 600

mapa.width = anchoMapa
mapa.height = alturaBuscada
//Clases
class Mokepon {
    constructor(nombre, foto, vida, tipo, fotoMapa, x=10, y=10) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.tipo = tipo;
        this.width = 80;
        this.height = 80;
        this.x = aleatorio(0, mapa.width - this.width);
        this.y = aleatorio(0, mapa.height - this.height);
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.width,
            this.height,
        )
    }
}
class Tipo {
    constructor(nombre, tarjeta, color) {
        this.nombre = nombre;
        this.tarjeta = tarjeta;
        this.color = color;
    }
}

//Tipos
let fuego = new Tipo('Fuego', 'tarjetaFuego', 'firebrick')
let agua = new Tipo('Agua', 'tarjetaAgua', 'rgb(17, 17, 168)')
let planta = new Tipo('Planta', 'tarjetaPlanta', 'rgb(19, 168, 19)')

//Mokepones
let charmander = new Mokepon('Charmander', './imagenes/4m3s.gif', '3', fuego,'./imagenes/CharmanderAvatar.png')
let stitch = new Mokepon('Stitch', './imagenes/sti.gif', '3', agua ,'./imagenes/StitchHead.png')
let hongo = new Mokepon('Hongo', './imagenes/hongooo.gif', '3', planta, './imagenes/HongoAvatar.png')

let charmanderEnemigo = new Mokepon('Charmander', './imagenes/4m3s.gif', '3', fuego,'./imagenes/CharmanderAvatar.png')
let stitchEnemigo = new Mokepon('Stitch', './imagenes/sti.gif', '3', agua ,'./imagenes/StitchHead.png')
let hongoEnemigo = new Mokepon('Hongo', './imagenes/hongooo.gif', '3', planta, './imagenes/HongoAvatar.png')



//Ataques Mokepones
charmander.ataques.push(
    { nombre: 'Ascuas', id: 'boton-Lanzallamas' },
    { nombre: 'Arañazo', id: 'boton-Hidrobomba' },
    { nombre: 'Lanzallamas', id: 'boton-Gigadrenado' },
)

stitch.ataques.push(
    { nombre: 'Placaje', id: 'boton-Lanzallamas' },
    { nombre: 'Atraccion', id: 'boton-Hidrobomba' },
    { nombre: 'Doble equipo', id: 'boton-Gigadrenado' },
)

hongo.ataques.push(
    { nombre: 'Polvo veneno', id: 'boton-Lanzallamas' },
    { nombre: 'Teletransportacion', id: 'boton-Hidrobomba' },
    { nombre: 'Rayo solar', id: 'boton-Gigadrenado' },
)

mokepones.push(charmander, stitch, hongo)

//Funciones
function iniciarJuego() {
    ocultarAtaque.style.display = 'none'
    verMapa.style.display = 'none'
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class=${mokepon.tipo.tarjeta} for=${mokepon.nombre}>
            <p class="tex"> ${mokepon.nombre} </p>
            <img src=${mokepon.foto} alt=${mokepon.nombre} class="ch">
        </label>
        `
        divTarjeta.innerHTML += opcionDeMokepones;
    })
    botonReiniciar.style.display = 'none'
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)
    msj.style.display = 'none';

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function seleccionarMascotaJugador() {
    ocultarMascota.style.display = 'none'
    ocultarAtaque.style.display = 'none'
    verMapa.style.display = 'flex'
   

    let tarjetaJugador = document.getElementById("one")
    mokepones.forEach((mokepon) => {
        if (document.getElementById(mokepon.nombre).checked) {
           
            MascotaJugador = mokepon.nombre
            spanMascotaJugador.innerHTML = mokepon.nombre
            tarjetaJugador.style.backgroundColor = mokepon.tipo.color
            
        }
    })
    seleccionarMokepon(MascotaJugador)
    extraerAtaques(MascotaJugador)
    
    iniciarMapa()

}

function seleccionarMokepon(MascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,({
        method: "post",
        headers:  {
             "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            mokepon: MascotaJugador
        })
    }))
}


function extraerAtaques(MascotaJugador) {
    let ataques

    mokepones.forEach((mokepon) => {
        if (MascotaJugador === mokepon.nombre) {
            ataques = mokepon.ataques;
        }
    })

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataques) => {
        ataquesDisponibles = `
        <button id=${ataques.id} class="BAtaque">${ataques.nombre}</button>
        `
        divAtaque.innerHTML += ataquesDisponibles;
    })

    botonLanzallamas = document.getElementById("boton-Lanzallamas")
    botonHidrobomba = document.getElementById("boton-Hidrobomba")
    botonGigadrenado = document.getElementById("boton-Gigadrenado")
    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque() {
    let movPl = document.getElementById('movJ')
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.id === "boton-Lanzallamas") {
                ataqueJugador.push('Lanzallamas')
                indexAtaqueJugador.push('🔥')
                movPl.innerHTML = indexAtaqueJugador;
                enemigo()
            } else if (e.target.id === "boton-Hidrobomba") {
                ataqueJugador.push('Hidrobomba')
                indexAtaqueJugador.push('💧')
                movPl.innerHTML = indexAtaqueJugador;
                enemigo()
            }

            else {
                ataqueJugador.push('Gigadrenado')
                indexAtaqueJugador.push('🌿')
                movPl.innerHTML = indexAtaqueJugador;
                enemigo()
            }


        })
    })

}

function seleccionarMascotaEnemigo(enemigo) {
    
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo")
    let tarjetaEnemigo = document.getElementById("two")
    MascotaEnemigo = enemigo
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    tarjetaEnemigo.style.backgroundColor = enemigo.tipo.color

    secuenciaAtaque()
}

function enemigo() {
    let ataque = aleatorio(1, 3)
    if (ataque == 1) {
        ataqueEnemigo.push("Lanzallamas")
        indexAtaqueEnemigo.push('🔥')

    }
    else if (ataque == 2) {
        ataqueEnemigo.push("Hidrobomba")
        indexAtaqueEnemigo.push('💧')

    }
    else if (ataque == 3) {
        ataqueEnemigo.push("Gigadrenado")
        indexAtaqueEnemigo.push('🌿')

    }

    iniciarPelea()
    vida()
}


function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        let spanVidaE = document.getElementById("vidaE")
        let spanVidaJ = document.getElementById("vidaJ")
        winlose()
        msj.style.display = 'flex';
        let combate = document.getElementById('WOL')
        let movPl = document.getElementById('movJ')
        let movEn = document.getElementById('movE')

        if (vicE > vicJ) {
            combate.innerHTML = "Perdiste";
            spanVidaE.innerHTML = vicE
            spanVidaJ.innerHTML = vicJ
            final()
        }
        else if (vicJ > vicE) {
            combate.innerHTML = "Ganaste"
            spanVidaE.innerHTML = vicE
            spanVidaJ.innerHTML = vicJ
            final()
        }
        else {
            combate.innerHTML = "Empate"
            spanVidaE.innerHTML = vicE
            spanVidaJ.innerHTML = vicJ
            final()
        }
        
        movEn.innerHTML = indexAtaqueEnemigo;
    }

}


function winlose() {


    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] == "Lanzallamas" && ataqueEnemigo[i] == "Hidrobomba" || ataqueJugador[i] == "Hidrobomba" && ataqueEnemigo[i] == "Gigadrenado" || ataqueJugador[i] == "Gigadrenado" && ataqueEnemigo[i] == "Lanzallamas") {
            vicE++
        }
        else if (ataqueEnemigo[i] == "Lanzallamas" && ataqueJugador[i] == "Hidrobomba" || ataqueEnemigo[i] == "Hidrobomba" && ataqueJugador[i] == "Gigadrenado" || ataqueEnemigo[i] == "Gigadrenado" && ataqueJugador[i] == "Lanzallamas") {
            vicJ++
        }

        if (ataqueJugador[i] == ataqueEnemigo[i]) {
            console.log('empate')
        }
    }

}
function vida() {
    // let spanVidaE = document.getElementById("vidaE")
    // let spanVidaJ = document.getElementById("vidaJ")
    // let test = document.getElementById("test")

    // if (vicE != 5 && vicJ != 5) {
    //     spanVidaE.innerHTML = vicE 
    //     spanVidaJ.innerHTML = vicJ
    // }
    // else if (vicE < vicJ) {
    //     alert("Fin del juego GANASTE")
    //     spanVidaE.innerHTML = vicE
    //     test.innerHTML = "GANASTE"
    //     final()
    // }
    // else if (vicE > vicJ) {
    //     alert("Fin del juego PERDISTE")
    //     spanVidaJ.innerHTML = vicJ
    //     test.innerHTML = "PERDISTE"
    //     final()
    // }

}
function final() {
    botonLanzallamas.disabled = true
    botonHidrobomba.disabled = true
    botonGigadrenado.disabled = true
    botonReiniciar.style.display = 'flex'

}
function reiniciarJuego() {
    location.reload()
}

function pintarCanvas() {

    miMokepon.x = miMokepon.x + miMokepon.velocidadX
    miMokepon.y = miMokepon.y + miMokepon.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBG,0,0,mapa.height,mapa.width)

    miMokepon.pintarMokepon()
    charmanderEnemigo.pintarMokepon()
    stitchEnemigo.pintarMokepon()
    hongoEnemigo.pintarMokepon()
    if(miMokepon.velocidadX !==0||miMokepon.velocidadY !==0)
    {
        colision(charmanderEnemigo)
        colision(stitchEnemigo)
        colision(hongoEnemigo)
    }
}

function moverCharmanderRight() {
    miMokepon.velocidadX = 5

}
function moverCharmanderDown() {
    miMokepon.velocidadY = 5

}
function moverCharmanderLeft() {
    miMokepon.velocidadX = -5

}
function moverCharmanderUp() {
    miMokepon.velocidadY = - 5

}
function detener() {

    miMokepon.velocidadX = 0
    miMokepon.velocidadY = 0
}

function presionado(event) {
    if(!combate){
        switch (event.key) {
        case 'ArrowUp':
            moverCharmanderUp()
            break;
        case 'ArrowDown':
            moverCharmanderDown()
            break;
        case 'ArrowLeft':
            moverCharmanderLeft()
            break;
        case 'ArrowRight':
            moverCharmanderRight()
            break;
        default:
            break;
    }
    }
}

function iniciarMapa(){

    miMokepon = obtenerMokepon()
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', presionado)
    window.addEventListener('keyup', detener)
}

function obtenerMokepon(){
    for(let i = 0; i< mokepones.length; i++){
        if (MascotaJugador === mokepones[i].nombre) {
            return mokepones[i];
        }
    }

}

function colision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.height
    
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.width
    
    const arribamiMokepon = miMokepon.y
    const abajomiMokepon = miMokepon.y + miMokepon.height
    
    const izquierdamiMokepon = miMokepon.x
    const derechamiMokepon = miMokepon.x + miMokepon.width

    if(
        abajomiMokepon < arribaEnemigo ||
        arribamiMokepon > abajoEnemigo ||
        izquierdamiMokepon > derechaEnemigo ||
        derechamiMokepon < izquierdaEnemigo 
        ){
            return ;
            

    }
    else{
        detener()
      
        combate = true
        verMapa.style.display = 'none'
        ocultarAtaque.style.display = 'flex'
        seleccionarMascotaEnemigo(enemigo)
    }
}




window.addEventListener('load', iniciarJuego)


