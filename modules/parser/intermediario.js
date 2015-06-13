
var vuelta;
var mostrando;
var mostrandoNuevoCampo=false;
var ordenActual=true;


function cargarElementosPrincipales(){
	vuelta=new Array();
	var objetos = parser.dameObjetos(ordenActual);
	mostrando=objetos;
	mostrarGoUp(false,false);
	mostrarDivNuevoYborrado(false);
	var directorios = dameDivLimpio();
	objetos.forEach(function(objeto, i) {
			actualizarVista("box file",objeto,objeto.name,directorios,true,objetos,null);
	});
	cargarAlterarOrden();
}

function cargarPropiedades(objeto,chequeo,orden){
	if(chequeo){
		var subElementos = parser.dameSubElementos(objeto,ordenActual);
		var propiedades = parser.damePropiedades(objeto,ordenActual);
		var directorios = dameDivLimpio();		
		//if(anterior==null) mostrarGoUp(false,false);
		//else 
			mostrarGoUp(true,chequeo);

		//for (var propiedad in propiedades){
		for (i = 0; i < propiedades.length; i++) { 
			var propiedad = propiedades[i];
			var valor = parser.damePropiedad(propiedad,objeto);
			var esDirectorio = (parser.dameTipo(valor)=="object");
			var clase = "box folder";
			var texto = propiedad+" : "+valor;
			if(esDirectorio){
				clase = "box file";
				texto = propiedad;
			} 
			actualizarVista(clase,valor,texto,directorios,esDirectorio,objeto,propiedad);
		}
			
	}
}

function actualizarVista(clase,objeto,texto,directorios,chequeo,anterior,propiedad){
			var divisor = document.createElement('div');
			divisor.className = clase;
			if(chequeo){
				divisor.onclick = function() {
						cargarPropiedades(objeto,chequeo,ordenActual);
						vuelta.push(anterior);
						mostrando=objeto;
				}
			}else{
				divisor.onclick = function() {
						var campoAcambiar = document.getElementById('campoAcambiar');
						var campoAborrar = document.getElementById('campoAborrar');
						var palabras = campoAcambiar.innerHTML.split(" ");
						var actual = palabras[palabras.length-1];
						//var estaVisible = (divValor.style.visibility == "visible");
						if(mostrandoNuevoCampo){
							if(actual==propiedad) mostrarDivNuevoYborrado(false);
						} 
						else mostrarDivNuevoYborrado(true);
						campoAcambiar.innerHTML = "Nuevo valor para el campo "+propiedad;
						campoAborrar.innerHTML = "Eliminar "+propiedad;

						var actualizar = document.getElementById('actualizar');
						var valor = document.getElementById('valor');
						valor.value="";
						actualizar.onclick = function() {
							parser.actualizar(anterior,propiedad,valor.value);
							mostrarDivNuevoYborrado(false);
							cargarPropiedades(anterior,true,ordenActual);
						}
						campoAborrar.onclick = function() {
							if (confirm("Esta seguro de eliminar "+propiedad+" del objeto?") == true) {
						        parser.eliminarPropiedad(anterior,propiedad);
								mostrarDivNuevoYborrado(false);
								cargarPropiedades(anterior,true,ordenActual);
						    }
						}
						cargarPropiedades(objeto,chequeo,ordenActual);
				}
			}
			
			var p = document.createElement('p');
			p.className = "name";
			p.innerHTML = texto;
			divisor.appendChild(p);
			directorios.appendChild(divisor);
}

function cargarAlterarOrden(){
	var alterarOrden = document.getElementById('alterarOrden');
	alterarOrden.onclick = function() {
			if(ordenActual) ordenActual=false;
			else ordenActual=true;
			if(vuelta.length==0) cargarElementosPrincipales();
			else cargarPropiedades(mostrando,true,ordenActual);

	}
}

function mostrarDivNuevoYborrado(cond){
	var divValor = document.getElementById('divValor');
	var divBorrado = document.getElementById('divBorrado');
	if(cond){
		mostrandoNuevoCampo=true;
		divValor.style.visibility='visible';
		divBorrado.style.visibility='visible';
	}else{
		mostrandoNuevoCampo=false;
		divValor.style.visibility='hidden';
		divBorrado.style.visibility='hidden';
	}
}

function mostrarGoUp(cond,chequeo){
	var elem = document.getElementsByClassName('box home')[0];
	if(cond){
		elem.style.visibility='visible';
		elem.onclick = function() {
						if(vuelta.length==1) cargarElementosPrincipales();
						else cargarPropiedades(vuelta.pop(),chequeo,ordenActual);
				}
	} 
	else{
		elem.style.visibility='hidden';
	} 
}

function dameDivLimpio(){
	var directorios = document.getElementById('directorios');
	while (directorios.hasChildNodes()) {
   	 directorios.removeChild(directorios.lastChild);
	}
	return directorios;
}




