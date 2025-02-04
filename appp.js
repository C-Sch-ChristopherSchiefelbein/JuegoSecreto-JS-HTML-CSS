// // let titulo = document.querySelector('h1')//el objeto DOCUMENT nos ayudara a conectar con el html con diferrentes metodos y propiedades
// // titulo.innerHTML = 'Juego-Numero Sercreto'

// let parrafo = document.querySelector('p')
// parrafo.innerHTML = 'Adivina el numero secreto que esta entre 1 y 100'


// //crearemos una funcion para darle un evento al boton
// //encapsulamos el codigo en una funcion
// function intentoDeUsuario() {
//     alert('cLICK DESDE EL BOTON')
// }
// asignarTextoElemento('h1', 'Juego-Numero Secreto')
// //hicimos las funciones genericas, asi podemos ocuparla de manera mas profesional
// //reduciendo codigo y haciendolo mas limpio
// asignarTextoElemento('p', 'Adivina el numero secreto que esta entre 1 y 10')
// //ahora solo llamamos a la funcion y le pasamos los parametro





//TODO LO QUE ESTA COMENTADO, HA SIDO ACTUIALIZADO Y REFACTORIZADO EN EL CODIGO DE ABAJO


let intentoDeUsuario=0;
let numeroSecreto=0;
let ListaNumSecretos = []
let numeroMaximoGenerado = 10
condicionesIniciales()
console.log(`num sec: ${numeroSecreto}`)


function condicionesIniciales(){
    asignarTextoElemento('h1', '🎯 Juego - Número Secreto');
    asignarTextoElemento('p', `Adivina el número secreto entre 1 y ${numeroMaximoGenerado}`);
    intentoDeUsuario = 1;
    numeroSecreto = generarNumSecreto();
    document.getElementById('NuevoJuegoBoton').disabled = true;
}

//funcion que remplaza el codigo anterior el cual definia el titulo y el parrafo
//ajustando y cambiandolo en el html de manera dinamica
function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;  
}

function limpiarInput(){
    let valorInput=document.querySelector('#numUsuario')
    valorInput.value=''
}

function generarNumSecreto(){
    let numGenerado =  Math.floor(Math.random() * numeroMaximoGenerado) + 1; 
    console.log(numGenerado)
    console.log(ListaNumSecretos)

    if (ListaNumSecretos.length === numeroMaximoGenerado){ //si la lista esta llena, terminamos la funcion con un mensaje de juego completado
        asignarTextoElemento('h1', '🎉 Juego completado, has adivinado todos los números secretos');
        //pediremos al usuario que confirme si desea reiniciar el juego
        setTimeout(() => { //funcion anonima compacta, ()=>{} es igual a function(){} pero mas corto y limpio 
        let confirmaReinicioLimpio = confirm('¿Deseas reiniciar el juego?')
        if (confirmaReinicioLimpio){
            ListaNumSecretos = [] //limpiamos la lista
            setTimeout(reiniciarJuego, 3000);
        } else {
            return alert(`Numeros acertados en orden: ${ListaNumSecretos}`) //mostramos la lista de numeros acertados
        }
        }, 3000);
        //si el usuario acepta, se reiniciara el juego
        //si el usuario cancela, se mantendra el juego completado y mostrara la lista de numeros acertados
    } else { //si la lista no esta llena, verificamos si el numero ya esta en la lista
            if (ListaNumSecretos.includes(numGenerado)){ //si el numero ya esta en la lista lo volvemos a generar 
                return generarNumSecreto()//recursividad
            } else { //si el numero no esta en la lista lo agregamos y lo retornamos 
                ListaNumSecretos.push(numGenerado)
                return numGenerado
            }
        }
} 


function verificaIntentoDeUsuario(){

    let numeroUsuario = parseInt(document.getElementById('numUsuario').value)
    if (numeroUsuario === numeroSecreto){
        asignarTextoElemento('h1', 'Felicidades, adivinaste el numero secreto, este era: ' + numeroSecreto)
        asignarTextoElemento('p', `Numero de intentos: ${intentoDeUsuario} ${(intentoDeUsuario === 1) ? 'vez' : 'veces'}`)
        document.getElementById('NuevoJuegoBoton').disabled = false;
            return; // Sale de la función para evitar incrementar el intento

    } else { //si el usuario no acierta
        if(numeroUsuario > numeroSecreto){
            asignarTextoElemento('h1', 'El numero secreto es menor') 
        }else if(numeroUsuario < numeroSecreto){
            asignarTextoElemento('h1', 'El numero secreto es mayor')
        } 
        limpiarInput()
    }
    intentoDeUsuario++
    console.log(intentoDeUsuario)
}

//funcion que se encarga de llevar el flujo del juego 
//y verificar si el usuario adivino el numero secreto
function flujoJuego() {  
    if (intentoDeUsuario <= 3) {
        console.log(`num sec: ${numeroSecreto}`)
        // Permite jugar hasta el intento 3
        verificaIntentoDeUsuario();
        // Si el usuario adivinó, no seguimos
        if (numeroSecreto === parseInt(document.getElementById('numUsuario').value)) {
            return;
        }
    }

    // Si el usuario falla en el tercer intento, pierde
    if (intentoDeUsuario > 3) { 
        asignarTextoElemento('h1', '❌ Perdiste, el número secreto era: ' + numeroSecreto);
        asignarTextoElemento('p', `Número de intentos: ${intentoDeUsuario - 1} ${(intentoDeUsuario - 1 === 1) ? 'vez' : 'veces'}`);
        
        setTimeout(reiniciarJuego, 3000);
    }
}


//nuevvo flujo de juego
function reiniciarJuego() {
    
    asignarTextoElemento('h1', '🔄 Reiniciando el juego...');
    asignarTextoElemento('p', '⏳ Espera un momento...');

    setTimeout(() => { //funcion anonima compacta, ()=>{} es igual a function(){} pero mas corto y limpio 
        condicionesIniciales()
        console.log(`num sec: ${numeroSecreto}`)
        limpiarInput();
    }, 3000);
}



