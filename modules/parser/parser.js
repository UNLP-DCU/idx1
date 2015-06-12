var parser = (function () {

   //PARTE PRIVADA
   var input = '[{"name": "index.html","path": "index.html","sha": "b1436f37573ce7fa17417f9a3859f3d149eca041","size": 5961,"url": "https://api.github.com/repos/vox-pop/organizacion/contents/index.html?ref=gh-pages","html_url": "https://github.com/vox-pop/organizacion/blob/gh-pages/index.html","git_url": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/b1436f37573ce7fa17417f9a3859f3d149eca041","download_url": "https://raw.githubusercontent.com/vox-pop/organizacion/gh-pages/index.html","type": "file","_links": {"self": "https://api.github.com/repos/vox-pop/organizacion/contents/index.html?ref=gh-pages","git": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/b1436f37573ce7fa17417f9a3859f3d149eca041","html": "https://github.com/vox-pop/organizacion/blob/gh-pages/index.html"}},{"name": "layout.html","path": "layout.html","sha": "4811ae40fe8bdd38ff1361fc8904a128d27073e6","size": 4794,"url": "https://api.github.com/repos/vox-pop/organizacion/contents/layout.html?ref=gh-pages","html_url": "https://github.com/vox-pop/organizacion/blob/gh-pages/layout.html","git_url": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/4811ae40fe8bdd38ff1361fc8904a128d27073e6","download_url": "https://raw.githubusercontent.com/vox-pop/organizacion/gh-pages/layout.html","type": "file","_links": {"self": "https://api.github.com/repos/vox-pop/organizacion/contents/layout.html?ref=gh-pages","git": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/4811ae40fe8bdd38ff1361fc8904a128d27073e6","html": "https://github.com/vox-pop/organizacion/blob/gh-pages/layout.html"}},{"name": "public","path": "public","sha": "367dec6d0328c3d444919e8e7aa6176c347f8a43","size": 0,"url": "https://api.github.com/repos/vox-pop/organizacion/contents/public?ref=gh-pages","html_url": "https://github.com/vox-pop/organizacion/tree/gh-pages/public","git_url": "https://api.github.com/repos/vox-pop/organizacion/git/trees/367dec6d0328c3d444919e8e7aa6176c347f8a43","download_url": null,"type": "dir","_links": {"self": "https://api.github.com/repos/vox-pop/organizacion/contents/public?ref=gh-pages","git": "https://api.github.com/repos/vox-pop/organizacion/git/trees/367dec6d0328c3d444919e8e7aa6176c347f8a43","html": "https://github.com/vox-pop/organizacion/tree/gh-pages/public"}},{"name": "site","path": "site","sha": "e99e01e4ca89a3a2cb80c24260f865232c9fddba","size": 885,"url": "https://api.github.com/repos/vox-pop/organizacion/contents/site?ref=gh-pages","html_url": "https://github.com/vox-pop/organizacion/blob/gh-pages/site","git_url": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/e99e01e4ca89a3a2cb80c24260f865232c9fddba","download_url": "https://raw.githubusercontent.com/vox-pop/organizacion/gh-pages/site","type": "file","_links": {"self": "https://api.github.com/repos/vox-pop/organizacion/contents/site?ref=gh-pages","git": "https://api.github.com/repos/vox-pop/organizacion/git/blobs/e99e01e4ca89a3a2cb80c24260f865232c9fddba","html": "https://github.com/vox-pop/organizacion/blob/gh-pages/site"}}]';
   var jsonArray = JSON.parse(input);	


  dameObjetosPrivate = function(orden){
	var resultado = new Array();
	jsonArray.forEach(function(object) {
			resultado.push(object);   		
	});
	if(orden) return resultado.sort();
	else return resultado.reverse();
  }

  dameObjetoPrivate = function(identificador,valor){

	var objeto;
	jsonArray.forEach(function(object) {
		if(object[identificador] == valor)
			objeto=object; 
	});
	return objeto;
  }

  damePropiedadesPrivate = function(objeto,orden){
		var resultado = new Array();
		for (var prop in objeto){
      resultado.push(prop);
    }
		if(orden) return resultado.sort();
    else return resultado.reverse();
  }

  dameSubElementosPrivate = function(objeto,orden){
		var resultado = new Array();
		for (var prop in objeto) 
		    resultado.push(objeto[prop]);
    if(orden) return resultado.sort();
		else return resultado.reverse();
  }

  dameSubDirectoriosPrivate = function(objeto){
		var resultado = new Array();
		for (var prop in objeto){
			if( (typeof objeto[prop]).toLowerCase() == "object")
				 resultado.push(objeto[prop]);
		}
		return resultado;
  }

  actualizarPrivate = function (objeto,propiedad,nuevo){
    objeto[propiedad]=nuevo;
    //return objeto;
  }


  //PARTE PÚBLICA
  return {

  	//Función que devuelve los objetos de un arreglo JSON en un arreglo js, en el orden especificado (normal si se manda true, al reverso en otro caso)
    dameObjetos: function(orden) {
      return dameObjetosPrivate(orden);
    },


    //Funcion que devuelve el objeto JSON que cumple que una propiedad determinada tiene un valor determinado, suponiendo que tal clave es única
    dameObjeto: function(id,valor){
    	return dameObjetoPrivate(id,valor);
    },

    //Función que devuelve el valor de nomPropiedad del objeto
    damePropiedad: function(nomPropiedad, objeto){
    	return objeto[nomPropiedad];
    },

    //Función que devuelve todas las propiedades del objeto JSON en un arreglo en el orden especificado (normal si se manda true, al reverso en otro caso)
    damePropiedades: function (objeto,orden){
    	return damePropiedadesPrivate(objeto,orden);
    },

    //Función que devuelve todos los subelementos de un objeto en un arreglo, sean estos directorios o tipos de dato primitivo, como strings, int, etc.,
    //en el orden especificado (normal si se manda true, al reverso en otro caso)
    dameSubElementos: function (objeto,orden){
    	return dameSubElementosPrivate(objeto);
    },

    //Función que devuelve todos los subdirectorios de un objeto (se considera directorio al objeto y no al tipo de dato primitivo) en un arreglo
    dameSubDirectorios: function (objeto){
    	return dameSubDirectoriosPrivate(objeto);
    },
	
  	//Función que devuelve el tipo de un objeto
  	dameTipo: function (objeto){
  		return typeof objeto;
  	},

    actualizar: function(objeto,propiedad,nuevo){
      return actualizarPrivate(objeto,propiedad,nuevo);
    },
  	
  	//Función de prueba, se muestra su invocación desde un html
  	prueba: function (){
  		alert ("Probando llamado de funciones del parser desde el html");
  	}

   };


})();

