/*! Version Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Este script se encarga de los eventos hapticos
 * manejados con la libreria Hammer */

//obtiene el div main-content
var dvContent = document.getElementById('main-content');

// crea una instancia hammer
var mc = new Hammer(dvContent);

// Configurar reconocedores...
mc.add( new Hammer.Pan({ threshold: 80 }) );

// Definiendo los eventos..
/*--deslizado hacia derecha--*/
mc.on("panright panleft", function(ev) {
  
    console.log( ev.type + "!");
     //metodo_cambiar();
});

/*--deslizado hacia izquierda--*/
mc.on("panleft", function(ev) {
    console.log("izquierda!");
    //metodo_cambiar();
});

