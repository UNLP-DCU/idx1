
var vuelta=new Array(); //PILA QUE CONTIENE EN EL TOPE EL PRÓXIMO ELEMENTO AL QUE IR HACIA ARRIBA NOS LLEVARÁ
var mostrandoNuevoCampo=false;
var ordenActual=true;
var objetos = parser.dameObjetos(true);
var mostrando=objetos; //PILA QUE CONTIENE EN EL TOPE EL ELEMENTO CUYAS PROPIEDADES SE ESTÁN MOSTRANDO
var indexActual=1;
var actual=parser.dameElemento(mostrando,indexActual); //ELEMENTO SELECCIONADO
var tipoSeleccionado="";

/**----------------------------------FUNCIONES LIMPIAS -------------------------------------------  **/
/**-----------------------------------------------------------------------------------------------  **/
/**-----------------------------------------------------------------------------------------------  **/

//FUNCION QUE CARGA Y MUESTRA EN LA VISTA A LOS DIRECTORIOS PRINCIPALES DEL JSON
function cargarElementosPrincipales(){
	iconoHaciaArriba(); //A borrarse al agregar los gestos
	iconoHaciaAdentro(); //A borrarse al agregar los gestos
	iconoCargarAlterarOrden(); //A borrarse al agregar los gestos
	iconoCargarIrADerecha(); //A borrarse al agregar los gestos
	iconoCargarIrAIzquierda(); //A borrarse al agregar los gestos
	iconoCargarActualizar(); //A borrarse al agregar los gestos
	mostrarDivNuevo(false);
	objetos = parser.dameObjetos(ordenActual);
	var directorios = limpiarVista();

	objetos.forEach(function(objeto, i) {
			creameIcono("box file",objeto,objeto.name,directorios,true,objetos,null);
	});
	pintarSeleccionado();
}

//FUNCION QUE ALTERA EL ORDEN EN QUE SE MUESTRAN LOS OBJETOS ACTUALES
function alterarOrden(){
	if(ordenActual) ordenActual=false;
	else ordenActual=true;
	if(vuelta.length==0) cargarElementosPrincipales();
	else{
		actual=mostrando;
		irHaciaAdentro();
	} 
}

//FUNCIÓN QUE VUELVE A MOSTRAR LOS ELEMENTOS DEL DIRECTORIO EN EL TOPE DE 'VUELTA'
function irHaciaArriba(){
	indexActual=1;
	if(vuelta.length!=0){
		mostrando=vuelta.pop();
		vuelta.push(mostrando);
		if(vuelta.length==1){
			vuelta.pop();
			cargarElementosPrincipales();
			actual=parser.dameElemento(objetos,1); 
		} 
		else{
			//vuelta.pop();
			actual=mostrando;
			irHaciaAdentro();
		} 
		mostrarDivNuevo(false);
		pintarSeleccionado();
	}
	
}

//FUNCIÓN QUE MUESTRA LOS SUBELEMENTOS DEL OBJETO ACTUAL
function irHaciaAdentro(){
	if(parser.dameTipo(actual).toLowerCase() == "object"){
		if(vuelta.length==0) vuelta.push(mostrando);
		else{
			var ultimo = vuelta.pop();
			if(ultimo!=mostrando){
				vuelta.push(ultimo);
				vuelta.push(mostrando);
			}
		}
			
		mostrando=actual;
		indexActual=1;
		var propiedades = parser.damePropiedades(actual,ordenActual);
		var directorios = limpiarVista();
		for (i = 0; i < propiedades.length; i++) { 
				var propiedad = propiedades[i];
				var valor = parser.damePropiedad(propiedad,actual);
				var esDirectorio = (parser.dameTipo(valor)=="object");
				var clase = "box folder";
				var texto = propiedad+" : "+valor;
				if(esDirectorio){
					clase = "box file";
					texto = propiedad;
				} 
				creameIcono(clase,valor,texto,directorios,esDirectorio,actual,propiedad);
		}
		actual=parser.dameElemento(mostrando,1,ordenActual);
		pintarSeleccionado();
	}else mostrarDivNuevo(true,actual);
	
}

function creameIcono(clase,valor,texto,directorios,esDirectorio,actual,propiedad){
	var divisor = document.createElement('div');
	divisor.className = clase;
	var p = document.createElement('p');
	p.className = "name";
	p.innerHTML = texto;
	divisor.appendChild(p);
	directorios.appendChild(divisor);
}


//FUNCIÓN QUE CAMBIA EL ELEMENTO SELECCIONADO POR EL SIGUIENTE A LA DERECHA
function irADerecha(){
	despintarSeleccionado()
	var tamaño = parser.dameTamaño(mostrando);
	if(indexActual<tamaño) indexActual=indexActual+1;
	else indexActual=1;
	actual=parser.dameElemento(mostrando,indexActual,ordenActual);
	mostrarDivNuevo(false);
	pintarSeleccionado();
}

//FUNCIÓN QUE CAMBIA EL ELEMENTO SELECCIONADO POR EL SIGUIENTE A LA IZQUIERDA
function irAIzquierda(){
	despintarSeleccionado();
	var tamaño = parser.dameTamaño(mostrando);
	if(indexActual>1) indexActual=indexActual-1;
	else indexActual=tamaño;
	actual=parser.dameElemento(mostrando,indexActual,ordenActual);
	mostrarDivNuevo(false);
	pintarSeleccionado();
}

//A TERMINAR
//FUNCION QUE ACTUALIZA EL VALOR DEL ELEMENTO SELECCIONADO EN BASE A LO INGRESADO
function actualizar(){
	/*var valor = document.getElementById('valor');
	parser.actualizar(anterior,propiedad,valor.value);*/
	alert("A terminar, todavia no hecho");
}

//FUNCIÓN QUE BORRA LO QUE TIENE EL DIV PRINCIPAL Y DEVUELVE AL MISMO
function limpiarVista(){
	var directorios = document.getElementById('directorios');
	while (directorios.hasChildNodes()) {
   	 directorios.removeChild(directorios.lastChild);
	}
	return directorios;
}

function mostrarDivNuevo(cond,objeto){
	var divValor = document.getElementById('divValor');
	var divActualizar = document.getElementById('divActualizar');
	if(cond){
		mostrandoNuevoCampo=true;
		divValor.style.visibility='visible';
		divActualizar.style.visibility='visible';
	}else{
		mostrandoNuevoCampo=false;
		divValor.style.visibility='hidden';
		divActualizar.style.visibility='hidden';
	}
}

function pintarSeleccionado(){
	var mostrados = document.getElementById('directorios').childNodes;
	var seleccionado = mostrados[indexActual-1];
	tipoSeleccionado=seleccionado.className;
	seleccionado.style.backgroundColor = 'gold';
}

function despintarSeleccionado(){
	var mostrados = document.getElementById('directorios').childNodes;
	var seleccionado = mostrados[indexActual-1];
	if(tipoSeleccionado=="box file") seleccionado.style.backgroundColor = 'purple';
	else seleccionado.style.backgroundColor = 'grey';
}

/**----------------------------------FUNCIONES A BORRAR ------------------------------------------  **/
/**-----------------------------------------------------------------------------------------------  **/
/**-----------------------------------------------------------------------------------------------  **/


//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'irHaciaArriba()'
//Además, debería borrarse el icono de la casita.
function iconoHaciaArriba(){
	var elem = document.getElementById('irHaciaArriba');
	elem.onclick = function() {
		irHaciaArriba();
	}
}

//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'irHaciaAdentro()'
//Además, debería borrarse el icono de la casita.
function iconoHaciaAdentro(){
	var elem = document.getElementById('irHaciaAdentro');
	elem.onclick = function() {
		irHaciaAdentro();
	}
}

//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'alterarOrden()'
//Además, debería borrarse el icono de alterar orden
function iconoCargarAlterarOrden(){
	var alterarOrdenDiv = document.getElementById('alterarOrden');
	alterarOrdenDiv.onclick = function() {
			alterarOrden();
	}
}

//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'irADerecha()'
//Además, debería borrarse el icono de ir a la derecha
function iconoCargarIrADerecha(){
	var irADerechaDiv = document.getElementById('irADerecha');
	irADerechaDiv.onclick = function() {
			irADerecha();
	}
}

//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'irAIzquierda()'
//Además, debería borrarse el icono de ir a la izquierda
function iconoCargarIrAIzquierda(){
	var irAIzquierdaDiv = document.getElementById('irAIzquierda');
	irAIzquierdaDiv.onclick = function() {
			irAIzquierda();
	}
}

//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'actualizar()'
//Además, debería borrarse el icono de actualizar
function iconoCargarActualizar(){
	var divActualizar = document.getElementById('divActualizar');
	divActualizar.onclick = function() {
			actualizar();
	}
}





