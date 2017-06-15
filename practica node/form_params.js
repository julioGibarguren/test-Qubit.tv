var http = require("http");
	fs = require("fs");
	parser = require("./params_parse.js")

var p = parser.parse;
 

http.createServer(function(req,res){

	if(req.url.indexOf("favicon.ico") > 0 ) { return; };

	fs.readFile("./index.html", function(err,html){
		var html_string = html.toString();
		var arreglo_parametros = [], parametros = {};
		//Expresión regular que busca en el HTML donde haya {x}
		var variables = html_string.match(/[^\{\}]+(?=\})/g);
		var nombre = "";

		var parametros = p(req);

		if(req.url.indexOf("?") > 0 ) {
			var url_data = req.url.split("?");
			var arreglo_parametros = url_data[1].split("&");
		}
		for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
			var parametro = arreglo_parametros[i];
			var param_data = parametro.split("=");
			parametros[param_data[0]] = param_data[1];
		}

		// variable {'nombre'}
		for (var i = variables.length - 1; i >= 0; i--) {
			//Lo ejecutamos como código javaScript
			//Para obtener el valor de dicha varible
			var variable = variables[i];

			//Reemplazar el contenido con llaves {} por su valor correspondiente
			html_string = html_string.replace("{" + variables[i] + "}", parametros[variable]);
			
		};
		res.writeHead(200,{"Content-Type":"text/html"});
		res.write(html_string);
		res.end();
	});
	
}).listen(8080);