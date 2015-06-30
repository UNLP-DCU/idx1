/*! Version accessibility.JS - v0.0.4 - 2015-06-15
 * Desarrollado usando JQuery version 1.11.3
 *
 * Este script se encarga del manejo de la accesibilidad web
 * utilizando tab-index y los eventos del teclado (tab-enter) 
*/

//Se define una funcion que agrega tabindex a los directorios
function agregarTabDirectorios() {
     $('#directorios').children('.box').attr('tabindex',1);
};




//Se define una funcion para el evento de presionar tecla enter
(function ($) {
     $.prototype.enterPressed = function (fn) {
            $(this).keypress(function (e) {
                 if ((e.keyCode || e.which) == 13) {
                       fn();
             }
      });
   };
}(jQuery || {}));


//Se define los eventos para cada uno de las opciones
$("#alterarOrden").enterPressed(function() {
    //alterarOrden(); llamar al una funcion javascript(?)
    startUp.alterarOrden();
    console.log( "alterar Orden");
    agregarTabDirectorios();
});

$("#irHaciaArriba").enterPressed(function() {
    startUp.irHaciaArriba();
    console.log( "-alterar Orden");
    agregarTabDirectorios();
    
});

$("#irHaciaAbajo").enterPressed(function() {
    startUp.irHaciaAdentro();
    console.log( "-abajo");
    agregarTabDirectorios();
});

$("#izquierda").enterPressed(function() {
    startUp.irAIzquierda();
    console.log( "-izuqierda");
    agregarTabDirectorios();
});

$("#derecha").enterPressed(function() {
    startUp.irADerecha();
    console.log( "-derecha");
    agregarTabDirectorios();
});

$("#actualizar").enterPressed(function() {
     startUp.cargarElementosPrincipales();
     console.log( "-actualizar");
     agregarTadDirectorios();
});

/* Agregando tab-index a los archivos obtenidos*/
$( document ).ready(function() {
   agregarTadDirectorios();
});


    
