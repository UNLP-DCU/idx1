/*! Version accessibility.JS - v0.0.4 - 2015-06-15
 * Desarrollado usando JQuery version 1.11.3
 *
 * Este script se encarga del manejo de la accesibilidad web
 * utilizando tab-index y los eventos del teclado (tab-enter) 
*/

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
    console.log( "alterar Orden");
    startUp.alterarOrden();
});

$("#irHaciaArriba").enterPressed(function() {
    console.log( "arriba");
    startUp.irHaciaArriba();
});

$("#irHaciaAbajo").enterPressed(function() {
    console.log( "abajo");
    startUp.irHaciaAdentro();
});

$("#izquierda").enterPressed(function() {
    console.log( "izuqierda");
    startUp.irAIzquierda();
});

$("#derecha").enterPressed(function() {
    console.log( "derecha");
    startUp.irADerecha();
});

$("#actualizar").enterPressed(function() {
     console.log( "actualizar");
     startUp.cargarElementosPrincipales();
});

/* Agregando tab-index a los archivos obtenidos*/
$( document ).ready(function() {
  $('#directorios').children('.box').attr('tabindex',1);
});
