/*! Version Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Este script se encarga de los eventos hapticos
 * manejados con la libreria Hammer */

//Obtener los archivos
//var archivos =  document.querySelectorAll("archivos"); 

//Obtener los directorios
//var directorios =  document.querySelectorAll("directorios");

//Obtener el div que contiene todo
var dvContent = document.getElementById('main-content');


//crea una instancia hammer para los archivos
//var ma = new Hammer(archivos);

//crea una instancia hammer para los directorios
//var md = new Hammer(directorios);

// crea una instancia hammer para el contenedor
var mc = new Hammer(dvContent);

// Configurar reconocedores...
mc.add( new Hammer.Pan({ threshold: 500 }) );

// Definiendo los eventos..
/*--deslizado hacia derecha--*/
mc.on("panright", function(ev) {
  	startUp.irADerecha();
    console.log( "derecha!");
});

mc.on("panup", function(ev) {
  	startUp.irHaciaArriba();
    console.log( "arriba!");
});

mc.on("tap", function(ev) {
	//Definir un evento cuando se hace un click
    console.log( "tap!");
});

/*--deslizado hacia izquierda--*/
mc.on("panleft", function(ev) {
	startUp.irAIzquierda();
    console.log("izquierda!");
});

// Evento press
mc.on("press", function(ev) {
    console.log("press!");
    startUp.irHaciaAdentro();
    
});
//Evento pellizcar cambia el orden de los elementos
mc.on("pinch", function(ev) {
    console.log("pellizcar");
    startUp.alterarOrden();
});
//Cambiar los pan por swipe solo hay que comentar los eventos pan y sacarle los comentarios a la siguiente seccion de codigo
/*
mc.on("swipeleft", function(ev) {
        startUp.irAIzquierda();   
    });

mc.on("swiperight", function(ev) {
        startUp.irADerecha();  
    });


//Sobre este no encontré mucha informacion pero creo que existe
mc.on("swipeup", function(ev) {
        startUp.irHaciaArriba();  
    });


*/

