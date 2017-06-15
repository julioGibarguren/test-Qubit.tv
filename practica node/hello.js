var http = require("http");
var manejador = function(solcitud, respuesta){
	console.log("l");
	respuesta.end("hola mundo");
}

var servidor = http.createServer(manejador);

servidor.listen(8080); // elegis el puerto