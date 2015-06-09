var parser = (function () {

   //PARTE PRIVADA
   var input = '[{"name": "index.html","path": "index.html","sha": "b1436f37573ce7fa17417f9a3859f3d149eca041","size": 5961,"url": "https://api.github.com/repos/vox-pop/organizacion/contents/index.html?ref=gh-pages","html_url": "https://github.com/vox-pop/organizacion/blob/gh-pages/index.html","git_url": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/b1436f37573ce7fa17417f9a3859f3d149eca041","download_url": "https://raw.githubusercontent.com/vox-pop/organizacion/gh-pages/index.html","type": "file","_links": {"self": "https://api.github.com/repos/vox-pop/organizacion/contents/index.html?ref=gh-pages","git": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/b1436f37573ce7fa17417f9a3859f3d149eca041","html": "https://github.com/vox-pop/organizacion/blob/gh-pages/index.html"}},{"name": "layout.html","path": "layout.html","sha": "4811ae40fe8bdd38ff1361fc8904a128d27073e6","size": 4794,"url": "https://api.github.com/repos/vox-pop/organizacion/contents/layout.html?ref=gh-pages","html_url": "https://github.com/vox-pop/organizacion/blob/gh-pages/layout.html","git_url": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/4811ae40fe8bdd38ff1361fc8904a128d27073e6","download_url": "https://raw.githubusercontent.com/vox-pop/organizacion/gh-pages/layout.html","type": "file","_links": {"self": "https://api.github.com/repos/vox-pop/organizacion/contents/layout.html?ref=gh-pages","git": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/4811ae40fe8bdd38ff1361fc8904a128d27073e6","html": "https://github.com/vox-pop/organizacion/blob/gh-pages/layout.html"}},{"name": "public","path": "public","sha": "367dec6d0328c3d444919e8e7aa6176c347f8a43","size": 0,"url": "https://api.github.com/repos/vox-pop/organizacion/contents/public?ref=gh-pages","html_url": "https://github.com/vox-pop/organizacion/tree/gh-pages/public","git_url": "https://api.github.com/repos/vox-pop/organizacion/git/trees/367dec6d0328c3d444919e8e7aa6176c347f8a43","download_url": null,"type": "dir","_links": {"self": "https://api.github.com/repos/vox-pop/organizacion/contents/public?ref=gh-pages","git": "https://api.github.com/repos/vox-pop/organizacion/git/trees/367dec6d0328c3d444919e8e7aa6176c347f8a43","html": "https://github.com/vox-pop/organizacion/tree/gh-pages/public"}},{"name": "site","path": "site","sha": "e99e01e4ca89a3a2cb80c24260f865232c9fddba","size": 885,"url": "https://api.github.com/repos/vox-pop/organizacion/contents/site?ref=gh-pages","html_url": "https://github.com/vox-pop/organizacion/blob/gh-pages/site","git_url": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/e99e01e4ca89a3a2cb80c24260f865232c9fddba","download_url": "https://raw.githubusercontent.com/vox-pop/organizacion/gh-pages/site","type": "file","_links": {"self": "https://api.github.com/repos/vox-pop/organizacion/contents/site?ref=gh-pages","git": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/e99e01e4ca89a3a2cb80c24260f865232c9fddba","html": "https://github.com/vox-pop/organizacion/blob/gh-pages/site"}}]';
   var jsonArray = JSON.parse(input);	



  //Función que devuelve los objetos de un arreglo JSON en un arreglo js, en orden normal o inverso dependiendo de cond
  dameObjetosPrivate = function(cond){
	var resultado = new Array();
	jsonArray.forEach(function(object) {
			resultado.push(object);   		
	});
	if(cond) return resultado.sort();
	else return resultado.reverse();
  }

  //Funcion que devuelve el objeto JSON que cumple que una propiedad determinada tiene un valor determinado, suponiendo que tal clave es única
  dameObjetoPrivate = function(identificador,valor){

	var objeto;
	jsonArray.forEach(function(object) {
		if(object[identificador] == valor){
			objeto=object; 
		}
	});
	return objeto;
  }

  //Función que devuelve todas las propiedades del objeto JSON junto con sus valores
  damePropiedadesPrivate = function(objeto){

		var resultado = {};
		for (var prop in objeto) 
		    resultado[prop] = objeto[prop];
		return resultado;
	}
	
  dameTipoPrivate = function(objeto){
	
  }

  //PARTE PÚBLICA
  return {
    dameObjetos: function( ) {
      return dameObjetosPrivate(true);
    },

    dameObjetosReverse: function( ) {
      return dameObjetosPrivate(false);
    },

    dameObjeto: function(id,valor){
    	return dameObjetoPrivate(id,valor);
    },

    damePropiedades: function (objeto){
    	return damePropiedadesPrivate(objeto);
    },
	
	dameTipo: function (objeto){
		return typeof objeto;
	},
	
	prueba: function (){
		alert ("Probando llamado de funciones del parser desde el html");
	}

   };


})();

 var objetos = parser.dameObjetos();
 var imprimir="";
 //PRUEBA DE DAME OBJETOS
 /*imprimir="Objetos al derecho: ";
 objetos.forEach(function(objeto,i) {
 			imprimir = imprimir.concat(i,") ",objeto.name);		
 });
 alert(imprimir);*/

 objetos = parser.dameObjetosReverse();
 //PRUEBA DE DAME OBJETOS REVERSE
 /*imprimir="Objetos al reves: ";
 objetos.forEach(function(objeto,i) {
 			imprimir = imprimir.concat(i,") ",objeto.name);
 });
 alert(imprimir);*/
 
 var objeto = parser.dameObjeto("name","index.html");
 //PRUEBA DE DAME OBJETO
 //alert("Objeto recuperado: ".concat("Name: ",objeto.name, ", Path: ",objeto.path,", Size: ", objeto.size));


 var propiedades = parser.damePropiedades(objeto);
 //PRUEBA DE DAME PROPIEDADES
 /*imprimir="";
 for (var prop in propiedades) 
		    imprimir = imprimir.concat(prop,":",objeto[prop],",");
 alert(imprimir);*/

 
 //PRUEBA DE DAME TIPO
 /*imprimir="Obteniendo tipos del objeto con nombre: ".concat(objeto.name,": ");
 for (var prop in objeto)
		    imprimir = imprimir.concat(prop,": ",parser.dameTipo(objeto[prop]),"; ");
 alert(imprimir);*/
