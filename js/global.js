//Colocar la carpeta fuente en un servidor local para que funcione la llamada de ajax

$(document).ready(function(){ 
	//CALL AJAX
	$.ajax({
		    type: "GET",
		    url: '../json/test.json', 
		    cache: false,  
	        crossOrigin: true,
	        async: false,   
		    dataType: "JSON", 

		    success: function( response ) {  
		    	 var title = response.landing.title;
		    	 var text = response.landing.text;
		    	 var items = response.landing.items; 
		    	 $(".title").text(title);
		    	 $(".bajada").text(text); 

		         $.each( items, function( key, value ) {  
		         	var image = value[Object.keys(value)[0]]; 
		         	var title = value[Object.keys(value)[1]]; 
		         	var text = value[Object.keys(value)[2]];  
		         	for(x in value) { 
		         		if (key === "item1") {
		         			$("main section div:nth-of-type(1) img").attr("src", image);
		         			$("main section div:nth-of-type(1) h2").text(title);
		         			$("main section div:nth-of-type(1) p").text(text);
		         		} else if (key === "item2") {
		         			$("main section div:nth-of-type(2) img").attr("src", image);
		         			$("main section div:nth-of-type(2) h2").text(title);
		         			$("main section div:nth-of-type(2) p").text(text);
		         		} else if (key === "item3") {
		         			$("main section div:nth-of-type(3) img").attr("src", image);
		         			$("main section div:nth-of-type(3) h2").text(title);
		         			$("main section div:nth-of-type(3) p").text(text);
		         		} else {
		         			$("main section div:nth-of-type(4) img").attr("src", image);
		         			$("main section div:nth-of-type(4) h2").text(title);
		         			$("main section div:nth-of-type(4) p").text(text);
		         		}
		         	}
		         	
 
		         });
		    },
		error: function() {
		  $("h1").text("Por favor colocar la carpeta fuente en un servidor local para ver la llamada de Ajax");
		}
	});
});	