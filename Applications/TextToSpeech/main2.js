window.onload = init;

function init(){
	// Create the OpenLayers map
	const map = new ol.Map({
		target: 'js-map', // The ID of the HTML element to contain the map
		view: new ol.View({
			center: ol.proj.fromLonLat([10, 60]), // Set the initial map center to (0, 0)
			zoom: 7 // Set the initial zoom level
		})
	});
	
	//Get an alert message box when clicking on map
	map.on('click', function(e){
		console.log(e.coordinate);
		var lonlat  = ol.proj.toLonLat(e.coordinate);
		alert('Lat: ' + lonlat[1] + '\n' + 'Lon: ' + lonlat[0]);
	})

	// Basemaps Layers
	const openStreetmapStandard = new ol.layer.Tile({
		source: new ol.source.OSM(),
		visible: true,
		title: 'OSMStandard'
	})
	
	
	map.addLayer(openStreetmapStandard);
	
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

}
