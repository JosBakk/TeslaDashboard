window.onload = init;
	// Show map// Define the coordinates of the polygon vertices
function init(){
	
	// Create the OpenLayers map
    var map = new ol.Map({
      target: 'js-map', // The ID of the HTML element to contain the map
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM() // Add an OpenStreetMap layer
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([10, 60]), // Set the initial map center to (0, 0)
        zoom: 7 // Set the initial zoom level
      })
    });
	
    var polygonCoords = [
      [586085.1608781607, 8505526.736965047],
	[1191643.6041096444, 8552108.09199866],
	[911401.1532598708, 8038343.620086051]
    ];

    // Create a vector layer to display the polygon
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Polygon([polygonCoords])
          })
        ]
      })
    });

	
	// Add polygon layer to map
	map.addLayer(vectorLayer);
	
	
	
	
	// Create a new vector layer to hold the point feature
  var vectorLayer2 = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: []
    })
  });
  
  
	// Get the user's current location using the HTML5 Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var coords = ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]);
      var pointFeature = new ol.Feature({
        geometry: new ol.geom.Point(coords)
      });
      vectorLayer2.getSource().addFeature(pointFeature);
      map.getView().setCenter(coords);
	  
	  var layer = new ol.layer.Vector({
       source: new ol.source.Vector({
         features: [
             new ol.Feature({
                 geometry: new ol.geom.Point(ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]))
                })
             ]
         })
       });
 map.addLayer(layer);
 
    });
  }
	
	
	
      // Get references to the file input and speak button
	  var button = document.getElementById("myButton");
	  
	  
	  button.addEventListener("click", function() {
        var file_number = document.getElementById("file_id").value;
		alert(file_number);
		var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://josbakk.github.io/TeslaDashboard/Applications/TextToSpeech/test" + file_number + ".txt");
        xhr.onload = function() {
          if (xhr.status === 200) {

            //alert(xhr.responseText);
			readLoud(xhr.responseText);
            //dataElement.textContent = "Title: " + data.title;
          }
        };
        xhr.send();
      });


        // Define a callback function to handle when the file is loaded
        function readLoud(textToRead){
          // Get the text content of the file

          // Create a new SpeechSynthesisUtterance object
          const utterance = new SpeechSynthesisUtterance(textToRead);

          // Set the language of the utterance to Norwegian
          utterance.lang = 'nb-NO';

          // Speak the text using the default speech synthesizer
          window.speechSynthesis.speak(utterance);
        };
}