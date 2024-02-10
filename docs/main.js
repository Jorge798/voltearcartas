let tarjetaDestapada = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let tiempoRegresivoId = null;

let tiempoAudio = new Audio("./audio/panther.mp3");

let mostrarMovimientos = document.getElementById('estadisticas');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempor = document.getElementById('time');

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5})
console.log(numeros);

//Funcion contar tiempo
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempor.innerHTML = `Tiempo: ${timer} segundos`;
        tiempoAudio.play();
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            tiempoAudio.pause();
            tiempoAudio.currentTime = 0;
            bloquearTarjeta();
        }
    },1000);
}

tiempoAudio.addEventListener('ended',()=>{
    tiempoAudio.currentTime = 0;
    tiempoAudio.play();
});

function bloquearTarjeta(){
    for(let i=0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.jpg" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion Principal
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetaDestapada++;
    console.log(tarjetaDestapada);

    if(tarjetaDestapada == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.jpg" alt="">`;

        tarjeta1.disabled = true;
    }else if(tarjetaDestapada == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.jpg" alt="">`;

        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            tarjetaDestapada = 0;

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} gano OMG!`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} es grande!!`;
            }
        }else{
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetaDestapada = 0;
            },1000);
        }
    }
}