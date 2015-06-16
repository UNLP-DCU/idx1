var aerogestual = (function(){
	comenzarPrivate = function(accion, contexto){
		gyro.startTracking(function(o) {
			if((o.x < -11) || (o.x > 11)){
				accion().bind(contexto);
			}
		});
	}
	return{
		comenzar: function(accion, contexto){
			comenzarPrivate(accion, contexto);
		},
	};
})()

