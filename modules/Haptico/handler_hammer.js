/*! Version Hammer.JS - v2.0.4 - 2014-09-28 
 * http://hammerjs.github.io/
 *
 * Este script se encarga de los eventos hapticos 
 * manejados con la libreria Hammer */

var myElement = document.getElementById('main-content');

// crea una instancia hammer
var mc = new Hammer(myElement);

// Definiendo los eventos..
/*--deslizado hacia derecha--*/
mc.on("panright", function(ev) {
    //myElement.textContent = ev.type +" >>>>>>>>>>";
    console.log("Derecha!");
     //metodo_cambiar();
});

/*--deslizado hacia izquierda--*/
mc.on("panleft", function(ev) {
    //myElement.textContent = ev.type +" <<<<<<<<<<<";
    console.log("izquierda!");
    //metodo_cambiar();
});
 
