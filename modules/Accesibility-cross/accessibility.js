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

//Setea el mensaje del estado de los cambios realizados
function setMsg(description) {  
      // $("#status").attr("aria-relevant","text");
       //$("#status").attr("role","status");
       $("#status").text(description);
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
    setMsg("Se alteró el orden de los archivos");
});

$("#irHaciaArriba").enterPressed(function() {
    startUp.irHaciaArriba();
    console.log( "-alterar Orden");
    agregarTabDirectorios();
    setMsg("Se subió un nivel en los archivos");
    
});

$("#irHaciaAbajo").enterPressed(function() {
    startUp.irHaciaAdentro();
    console.log( "-abajo");
    agregarTabDirectorios();
    setMsg("Se bajó un nivel en los archivos");
});

$("#izquierda").enterPressed(function() {
    startUp.irAIzquierda();
    console.log( "-izuqierda");
    agregarTabDirectorios();
    setMsg("Se posicionó a la izquierda");
});

$("#derecha").enterPressed(function() {
    startUp.irADerecha();
    console.log( "-derecha");
    agregarTabDirectorios();
    setMsg("Se posicionó a la derecha");
});

$("#actualizar").enterPressed(function() {
     startUp.cargarElementosPrincipales();
     console.log( "-actualizar");
     agregarTabDirectorios();
     setMsg("Se actualizó los archivos");
});

/* Agregando tab-index a los archivos obtenidos*/
$( document ).ready(function() {
   agregarTabDirectorios();
});


    
