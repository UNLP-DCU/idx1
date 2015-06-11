
var vuelta;


function cargarElementosPrincipales(){
	vuelta=new Array();
	var objetos = parser.dameObjetos();
	mostrarGoUp(false,false);
	var directorios = dameDivLimpio();
	objetos.forEach(function(objeto, i) {
			actualizarVista("box file",objeto,objeto.name,directorios,true,objetos);
	});
}

function cargarPropiedades(objeto,chequeo){
	if(chequeo){
		var subElementos = parser.dameSubElementos(objeto);
		var propiedades = parser.damePropiedades(objeto);
		var directorios = dameDivLimpio();		
		//if(anterior==null) mostrarGoUp(false,false);
		//else 
			mostrarGoUp(true,chequeo);

		for (var propiedad in propiedades){
			var valor = parser.damePropiedad(propiedad,objeto);
			var esDirectorio = (parser.dameTipo(valor)=="object");
			var clase = "box folder";
			var texto = propiedad+" : "+valor;
			if(esDirectorio){
				clase = "box file";
				texto = propiedad;
			} 
			actualizarVista(clase,valor,texto,directorios,esDirectorio,objeto);
		}
			
	}
}

function actualizarVista(clase,objeto,texto,directorios,chequeo,anterior){
			var divisor = document.createElement('div');
			divisor.className = clase;
			if(chequeo){
				divisor.onclick = function() {
						cargarPropiedades(objeto,chequeo);
						vuelta.push(anterior);
				}
			}
			
			var p = document.createElement('p');
			p.className = "name";
			p.innerHTML = texto;
			divisor.appendChild(p);
			directorios.appendChild(divisor);
}

function mostrarGoUp(cond,chequeo){
	var elem = document.getElementsByClassName('box home')[0];
	if(cond){
		elem.style.visibility='visible';
		elem.onclick = function() {
						if(vuelta.length==1) cargarElementosPrincipales();
						else cargarPropiedades(vuelta.pop(),chequeo);
				}
	} 
	else elem.style.visibility='hidden';
}

function dameDivLimpio(){
	var directorios = document.getElementById('directorios');
	while (directorios.hasChildNodes()) {
   	 directorios.removeChild(directorios.lastChild);
	}
	return directorios;
}