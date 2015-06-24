

/**----------------------------------FUNCIONES LIMPIAS -------------------------------------------  **/
/**-----------------------------------------------------------------------------------------------  **/
/**-----------------------------------------------------------------------------------------------  **/
var startUp = (function (parser) {

	//Parte Privada
	var vuelta=new Array(); //PILA QUE CONTIENE EN EL TOPE EL PRÓXIMO ELEMENTO AL QUE IR HACIA ARRIBA NOS LLEVARÁ
	var mostrandoNuevoCampo=false;
	var ordenActual=true;
	var objetos = parser.dameObjetos(true);
	var mostrando=objetos; //PILA QUE CONTIENE EN EL TOPE EL ELEMENTO CUYAS PROPIEDADES SE ESTÁN MOSTRANDO
	var indexActual=1;
	var actual=parser.dameElemento(mostrando,indexActual); //ELEMENTO SELECCIONADO
	var tipoSeleccionado="";

//FUNCION QUE CARGA Y MUESTRA EN LA VISTA A LOS DIRECTORIOS PRINCIPALES DEL JSON

cargarElementosPrincipalesPrivate = function(){
	//iconoHaciaArriba(); //A borrarse al agregar los gestos
	//iconoHaciaAdentro(); //A borrarse al agregar los gestos
	//iconoCargarAlterarOrden(); //A borrarse al agregar los gestos
	//iconoCargarIrADerecha(); //A borrarse al agregar los gestos
	//iconoCargarIrAIzquierda(); //A borrarse al agregar los gestos
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
alterarOrdenPrivate = function(){
	despintarSeleccionado();
	indexActual=1;
	mostrarDivNuevo(false);
	if(ordenActual) ordenActual=false;
	else ordenActual=true;
	if(vuelta.length==0) cargarElementosPrincipalesPrivate();
	else{
		actual=mostrando;
		irHaciaAdentroPrivate();
	} 
}

//FUNCIÓN QUE VUELVE A MOSTRAR LOS ELEMENTOS DEL DIRECTORIO EN EL TOPE DE 'VUELTA'
irHaciaArribaPrivate = function(){
	indexActual=1;
	if(vuelta.length!=0){
		mostrando=vuelta.pop();
		vuelta.push(mostrando);
		if(vuelta.length==1){
			vuelta.pop();
			cargarElementosPrincipalesPrivate();
			actual=parser.dameElemento(objetos,1); 
		} 
		else{
			//vuelta.pop();
			actual=mostrando;
			irHaciaAdentroPrivate();
		} 
		mostrarDivNuevo(false);
		pintarSeleccionado();
	}
	
}

//FUNCIÓN QUE MUESTRA LOS SUBELEMENTOS DEL OBJETO ACTUAL
irHaciaAdentroPrivate = function(){
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

 creameIcono= function (clase,valor,texto,directorios,esDirectorio,actual,propiedad){
	var divisor = document.createElement('div');
	divisor.className = clase;
	var p = document.createElement('p');
	p.className = "name";
	p.innerHTML = texto;
	divisor.appendChild(p);
	directorios.appendChild(divisor);
}


//FUNCIÓN QUE CAMBIA EL ELEMENTO SELECCIONADO POR EL SIGUIENTE A LA DERECHA
irADerechaPrivate = function(){
	despintarSeleccionado()
	var tamaño = parser.dameTamaño(mostrando);
	if(indexActual<tamaño) indexActual=indexActual+1;
	else indexActual=1;
	actual=parser.dameElemento(mostrando,indexActual,ordenActual);
	mostrarDivNuevo(false);
	pintarSeleccionado();
}

//FUNCIÓN QUE CAMBIA EL ELEMENTO SELECCIONADO POR EL SIGUIENTE A LA IZQUIERDA
irAIzquierdaPrivate = function(){
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
actualizarPrivate = function(){
	/*var valor = document.getElementById('valor');
	parser.actualizar(anterior,propiedad,valor.value);*/
	alert("A terminar, todavia no hecho");
}

//FUNCIÓN QUE BORRA LO QUE TIENE EL DIV PRINCIPAL Y DEVUELVE AL MISMO
limpiarVista = function(){
	var directorios = document.getElementById('directorios');
	while (directorios.hasChildNodes()) {
   	 directorios.removeChild(directorios.lastChild);
	}
	return directorios;
}

mostrarDivNuevo = function(cond,objeto){
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

pintarSeleccionado = function(){
	var mostrados = document.getElementById('directorios').childNodes;
	var seleccionado = mostrados[indexActual-1];
	tipoSeleccionado=seleccionado.className;
	seleccionado.style.backgroundColor = 'gold';
}

despintarSeleccionado = function(){
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
/*iconoHaciaArriba = function(){
	var elem = document.getElementById('irHaciaArriba');
	elem.onclick = function() {
		irHaciaArribaPrivate();
	}
}*/

//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'irHaciaAdentro()'
//Además, debería borrarse el icono de la casita.
/*iconoHaciaAdentro = function(){
	var elem = document.getElementById('irHaciaAdentro');
	elem.onclick = function() {
		irHaciaAdentroPrivate();
	}
}*/

//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'alterarOrden()'
//Además, debería borrarse el icono de alterar orden
/*iconoCargarAlterarOrden = function(){
	var alterarOrdenDiv = document.getElementById('alterarOrden');
	alterarOrdenDiv.onclick = function() {
			alterarOrdenPrivate();
	}
}*/

//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'irADerecha()'
//Además, debería borrarse el icono de ir a la derecha
/*iconoCargarIrADerecha = function(){
	var irADerechaDiv = document.getElementById('irADerecha');
	irADerechaDiv.onclick = function() {
			irADerechaPrivate();
	}
}*/

//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'irAIzquierda()'
//Además, debería borrarse el icono de ir a la izquierda
/*iconoCargarIrAIzquierda = function(){
	var irAIzquierdaDiv = document.getElementById('irAIzquierda');
	irAIzquierdaDiv.onclick = function() {
			irAIzquierdaPrivate();
	}
}*/

//ESTA FUNCIÓN, AL UTILIZAR GESTOS, DEBE BORRARSE, Y SÓLO HACER QUE AL HACER DETERMINADO GESTO SE LLAME A LA FUNCIÓN 'actualizar()'
//Además, debería borrarse el icono de actualizar
iconoCargarActualizar = function(){
	var divActualizar = document.getElementById('divActualizar');
	divActualizar.onclick = function() {
			actualizarPrivate();
	}
}

//PARTE PÚBLICA
  return {

  	cargarElementosPrincipales: function(){
  		return cargarElementosPrincipalesPrivate();
  	},

  	alterarOrden: function(){
  		return alterarOrdenPrivate();
  	},

  	irHaciaAdentro: function(){
  		return irHaciaAdentroPrivate();
  	},

  	irHaciaArriba: function(){
  		return irHaciaArribaPrivate();
  	},

  	irADerecha: function(){
  		return irADerechaPrivate();
  	},

  	irAIzquierda: function(){
  		return irAIzquierdaPrivate();
  	}

  };


})(parser);








