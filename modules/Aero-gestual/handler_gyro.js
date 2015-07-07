var aerogestual = (function(){
	comenzarPrivate = function(accion, contexto, params){
		gyro.startTracking(function(o) {
			if((o.x < -11) || (o.x > 11)){
				accion.call(contexto, params);
			}
		});
	}
	return{
		comenzar: function(accion, contexto, params){
			comenzarPrivate(accion, contexto, params);
		},
	};
})()

