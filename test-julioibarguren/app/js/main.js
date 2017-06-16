var viewportHeight = $(window).height();

mainResize();

$.getJSON( "js/test.json", function( data ) {
 
 $("h1").html( data.landing.title );
 $(".subtitle").html( data.landing.text );
 
 var items = [];
 $.each(data.landing.items, function (index, fila) {
      items.push( "<li class='col-md-3'>");
      items.push( "<img src='" + fila.image + "'/>");
      items.push( "<h2 class='text'>" + fila.title + "</h2>");
      items.push( "<p class='text'>" + fila.text + "</p>");
      items.push( "</li>" );
    });

    
$( "<ul/>", {
  "class": "services col-md-12",
  html: items.join( "" )
}).appendTo( "#main" );

});

function mainResize(){
        $("#main").css({'min-height':viewportHeight});
       }
     	 $(window).resize(function() {
          mainResize();
		});
