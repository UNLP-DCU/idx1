//Obtener los archivos
var archivos =  document.querySelectorAll("archivos"); 
//Obtener los directorios
var directorios =  document.querySelectorAll("directorios");
//Obtener el div que contiene todo
var contenedor = document.getElementoById("divContenedor");



//Evento pellizcar cambia el orden de los elementos
var pellizcar = new Hammer(contenedor);
pellizcar.on("pinch", function(ev) {
    //llamar a la funcion que visualiza archivos
});


//Evento dos dedos hacia izquierda, vuelve un directorio atras (habria que hacerlo sobre el "div" contenedor de los dir y arc.)
var tap1 = new Hammer.Tap(contenedor); // Aca tendria que decirle donde escuchar el evento?
var tap2 = new Hammer.Tap();
tap1.recognizeWith(tap2);
//Otra posible solucion

var mc = new Hammer.Manager(contenedor);
mc.add(new Hammer.Pan());
mc.add(new Hammer.Pan().recognizeWith(mc.get('pan'));
mc.on("acaNoSeQueEventoVa", irDirectorioAnterior );
//Funcion que implementa retroceder un directorio
function irDirectorioAnterior() {
//codigo que va al directorio anterior
}

//al tocar un archivo se abre
var eventoArch = new Hammer(archivos);
eventoArch.on("tap", function(ev) {
    //llamar a la funcion que visualiza archivos
});

//al presionar un archivo se ven sus detalles
eventoArch.on("press", function(ev) {
    //llamar a la funcion que da detalles de los archivos
});

//al tocar un directorio se abre
var eventoDir = new Hammer(directorios);
eventoDir.on("tap", function(ev) {
    //llamar a la funcion que visualiza directorios
});

//al presionar un directorio se ven sus detalles
eventoDir.on("press", function(ev) {
    //llamar a la funcion que da detalles de los directorios
});



// Otro evento a crear prodria ser el de "pellizcar" y que cambie de orden de los arch y dir de creciente a decreciente
