---

---
var ePrev = null;
var click = false;
var map = L.map('map', {
    center: [33.77686437792359, -84.3145751953125],
    zoom: 9
});
var geojson;
L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
		key: 'BC9A493B41014CAABB98F0471D759707'
	}).addTo(map);
var markers = null;
var markersLayer = null;
var bicycleIcon = L.icon({
	iconUrl: '{{ site.baseurl}}/lib/images/maki/bicycle-24.png'
});
var busIcon = L.icon({
	iconUrl: '{{ site.baseurl}}/lib/images/maki/bus-24.png'
});
var carIcon = L.icon({
	iconUrl: '{{ site.baseurl}}/lib/images/maki/car-24.png'
});
var pedIcon = L.icon({
	iconUrl: '{{ site.baseurl}}/lib/images/maki/ped-24.png'
});
var bridgeIcon = L.icon({
	iconUrl: '{{ site.baseurl}}/lib/images/maki/bridge-24.png'
});
var railIcon = L.icon({
	iconUrl: '{{ site.baseurl}}/lib/images/maki/rail-24.png'
});
var safetyIcon = L.icon({
	iconUrl: '{{ site.baseurl}}/lib/images/maki/safety-24.png'
});
var signalIcon = L.icon({
	iconUrl: '{{ site.baseurl}}/lib/images/maki/signal-24.png'
});
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        type = ["Bicycle",
				"Safety",
				"Transit",
				"Last Mile",
				"Roadway",
				"Other"]
        

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < type.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(type[i]) + '"></i> ' +
            type[i] + '<br>';
    }

    return div;
};
new L.Control.GeoSearch({
    provider: new L.GeoSearch.Provider.OpenStreetMap(),
    position: 'bottomleft',
    showMarker: false
}).addTo(map);
legend.addTo(map);

function onEachFeature (feature, layer) {
	// var popupContent = "" //+
	// // feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

	// if (feature.properties && feature.properties.PRJ_DESC) {
	// 	popupContent += toTitleCase(feature.properties.PRJ_DESC);
	// }

	// layer.bindPopup(popupContent);
	layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>TIP Projects</h4>' +  (props ?
        '<b><a href="{{ site.baseurl }}/data/#/'+props.ARCID+'">' + props.ARCID + '</a></b><br />' + toTitleCase(props.PRJ_DESC) + ''
        : 'Hover over a project');
};

info.addTo(map);
function lineColor(props) {
	var type = props.PRJ_TYPE;
	var desc = props.PRJ_DESC;
	if (/bicycle/i.test(type) || /bicycle/i.test(desc)){
		console.log("BIKE")
		return getColor("Bicycle")
	}
	else if (/safety/i.test(type) ){
		console.log("SAFETY")
		return getColor("Safety")
	}
	else if (/transit/i.test(type)){
		console.log("TRANSIT")
		return getColor("Transit")
	}
	else if (/last mile connectivity/i.test(type)){
		console.log("LMC")
		return getColor("Last Mile")
	}
	else if (/roadway/i.test(type)){
		console.log("ROAD")
		return getColor("Roadway")
	}
	else{
		console.log(props)
		return getColor();
	}
}
function getColor(d) {
    return d === "Bicycle" ? "#ff0000" :
           d === "Safety"  ? "#fcb90f" :
           d === "Transit"   ? "#0f23ff" :
           d === "Last Mile"  ? "#00ffff" :
           d === "Roadway"  ? "#b90ffc" :
                     "#000000" ;
}
function highlightFeature(e) {
	// if (ePrev && ePrev.target != e.target)
	// 	geojson.resetStyle(ePrev.target);
    var layer = e.target;
    click = false;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}
function resetHighlight(e) {
	if (!click){
    	geojson.resetStyle(e.target);
    	info.update();
	}
    
    
}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    var layer = e.target;
    if (click)
    	geojson.resetStyle(ePrev.target);
    click = true;
    if (click){
    	geojson.resetStyle(e.target);
	    layer.setStyle({
	        weight: 5,
	        color: '#000',
	        dashArray: ''
	    });
	 }
	 info.update(layer.feature.properties);
	 ePrev = e;
}
$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "{{ site.baseurl}}/data/rtp_points.geojson", 
		dataType: "json",
		success: function(data){
			markers = data;
			markersLayer = L.geoJson(data, {
				filter: function(feature, layer){
					if (feature.properties){
						return feature.properties.STATUS == "Programmed" ? true : false
					}
					return false
				},
				pointToLayer: function (feature, latlng) {
					var projType = feature.properties.PRJ_TYPE;
					var description = toTitleCase(feature.properties.PRJ_DESC)
					// console.log(feature.properties.PRJ_DESC+': '+feature.properties.PRJ_TYPE)
					if (/bicycle/i.test(projType) || /bike/i.test(projType) || /bicycle/i.test(description))
						return L.marker(latlng, {icon: bicycleIcon, title:description})
					else if (/bridge/i.test(projType) )
						return L.marker(latlng, {icon: bridgeIcon, title:description})
					else if (/signals/i.test(description) )
						return L.marker(latlng, {icon: signalIcon, title:description})
					
					else if (/safety/i.test(projType) )
						return L.marker(latlng, {icon: safetyIcon, title:description})
					else if (/rail/i.test(projType))
						return L.marker(latlng, {icon: railIcon, title:description})
					else if (/transit/i.test(projType))
						return L.marker(latlng, {icon: busIcon, title:description})
					else if (projType === "Last Mile Connectivity" || /pedestrian/i.test(description))
						return L.marker(latlng, {icon: pedIcon})
					else
						return L.marker(latlng, {icon: carIcon, title:description})
				},
				onEachFeature: onEachFeature
			}).addTo(map);
		}
	})
	$.ajax({
		type: "GET",
		url: "{{ site.baseurl}}/data/rtp_lines.geojson", 
		dataType: "json",
		success: function(data){
			markers = data;
			geojson = L.geoJson(data, {
				filter: function(feature, layer){
					if (feature.properties){
						return feature.properties.STATUS == "Programmed" ? true : false
					}
					return false
				},
				style: function (feature) {
					var projType = feature.properties.PRJ_TYPE;
					var description = feature.properties.PRJ_DESC;
					// console.log(feature.properties.PRJ_DESC+': '+feature.properties.PRJ_TYPE)
					return {
						color: lineColor(feature.properties),
						weight: 2,
						dashArray: '3'
					}
					
				},
				onEachFeature: onEachFeature
			}).addTo(map);
		}
	})
})
