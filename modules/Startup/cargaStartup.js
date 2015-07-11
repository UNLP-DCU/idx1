(function (startUp, aerogestual) {
	console.info( ">>> Iniciando app: idx1" );
	startUp.cargarElementosPrincipales();
        aerogestual.comenzar(startUp.alterarOrden, this, "");
}(startUp, aerogestual))