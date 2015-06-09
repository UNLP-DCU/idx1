/************************* *********************************/
/************************* *********************************/
/************************* *********************************/
/** FUNCIONES RELATIVAS A LA VISTA **/

//Función invocada al cargar el body, que vuelca en el los objetos/directorios del JSON
function cargaDirectoriosEn(contenedor,idElementoJson) {
		var jsonArray = jsonComoArray(idElementoJson);

		var objetos = dameObjetosDe(jsonArray);

		var container = document.getElementById(contenedor);
		borrarleContenido(container);
		

		objetos.forEach(function(objeto,i) {
			var divisor = document.createElement('div');

			var directorio = document.createElement('a');
			var linkText = document.createTextNode("Ver Detalles");
			directorio.appendChild(linkText);

			//aquí deberia pasar el objeto, el contenedor y el archivo json parseado como objetos y no como texto, pero tira error "unexpected identifier"
			directorio.href = "javascript:mostrarPropiedadesEn("+i+",\""+contenedor+"\",\""+idElementoJson+"\")";

			divisor.innerHTML = "Elemento "+(i+1)+" ";
			divisor.appendChild(directorio);

			//directorio.innerHTML = "Elemento " + (i+1) + ". <a href='javascript:mostrarPropiedadesEn("+i+",\""+contenedor+"\",\""+idElementoJson+"\")'> Ver detalles</a>";
			container.appendChild(divisor);    			
		});
}

/**DEBERIA HACER EL IDELEMENTOJSON UNA VARIABLE GLOBAL **/
/**EN VEZ DE NUMERO OBJ, DEBERIA SER EL OBJETO EN SI EL PARAMETRO **/
function mostrarPropiedadesEn(numeroObj,contenedor,idElementoJson){

	var jsonArray = jsonComoArray(idElementoJson);

	var objeto = dameObjeto(numeroObj,jsonArray);

	var container = document.getElementById(contenedor);  /**esto no deberia hacerse, deberia recibir ya el objeto contenedor como en los siguientes**/

	var propiedades = damePropiedades(objeto);
	agregarPropiedadesA(numeroObj,container,propiedades,idElementoJson);

	var volverA = document.createElement("div");
	
	volverA.innerHTML = "<a href='javascript:cargaDirectoriosEn(\""+contenedor+"\",\""+idElementoJson+"\")'>Volver</a>";
	container.appendChild(volverA);
}

function agregarPropiedadesA(numeroObj,contenedor,propiedades,idElementoJson){
	borrarleContenido(contenedor);
	
	for (var prop in propiedades)
	{
		var propiedad = document.createElement("div");
		if ( (Object.prototype.toString.call(propiedades[prop])) == "[object Object]"){
			propiedad.innerHTML =prop + ": "+ "<a href='javascript:mostrarPropiedadesEn("+numeroObj+",\""+contenedor+"\",\""+idElementoJson+"\")'> Ver detalles (aun no anda)</a>";
			

		} else propiedad.innerHTML = prop + ": "+propiedades[prop] + ". <a href='javascript:cambiarPorHola("+numeroObj+",\""+prop+"\",\""+idElementoJson+"\")'> Cambiar "+prop+" por algo (aun no anda)</a>";
		contenedor.appendChild(propiedad);
	}
}

function borrarleContenido(contenedor){
	while (contenedor.hasChildNodes()) {
   	 contenedor.removeChild(contenedor.lastChild);
	}
}
/************************* *********************************/
/************************* *********************************/
/************************* *********************************/
/** FUNCIONES RELATIVAS A OBJETOS JS **/

//Convierte un Json en un arreglo JS
function jsonComoArray(idElementoJson){
	var text = document.getElementById(idElementoJson).text;
	var array = JSON.parse(text);
	return array;
}


//Función que devuelve los objetos de un arreglo JSON en js
function dameObjetosDe(jsonArray){
	var resultado = new Array();
	jsonArray.forEach(function(object) {
			resultado.push(object);   			
	});
	return resultado;
}

//Funcion que devuelve el objeto JSON que cumple que una propiedad determinada tiene un valor determinado, suponiendo que tal clave es única
 function dameObjeto(identificador,valor,jsonArray){

	var objeto;

	jsonArray.forEach(function(object) {
		if(object[identificador] == valor){
			objeto=object; 
		}
	});

	return objeto;
 }

 //Funcion que devuelve el objeto numero "numero" del JSON 
 function dameObjeto(numero,jsonArray){
	var objeto;

	var aux=0;
	jsonArray.forEach(function(object) {
		if(aux==numero){
			objeto=object; 
		} 
		aux=aux+1;
	});

	return objeto;
 }

//Función que devuelve todas las propiedades del objeto JSON junto con sus valores
function damePropiedades(objeto){

	var resultado = {};

	for (var prop in objeto) 
	    resultado[prop] = objeto[prop];

	return resultado;
}


//funcion para ir probando cambiar una propiedad de un objeto JSON, aún no anda igualmente
function cambiarPorHola(numeroObj,propiedad,idElementoJson){
	var jsonArray = jsonComoArray(idElementoJson);
	var objeto = dameObjeto(numeroObj,jsonArray);
	alert("Cambiare "+objeto[propiedad]+" por Hola");
	objeto[propiedad]="Hola";
	//especie de refresh
	mostrarPropiedadesEn(numeroObj,'contenedor',idElementoJson);
}



