var API_KEY = "pk.eyJ1Ijoiam9obnNldGhjaG9uZyIsImEiOiJjazQ1d2J0aXkwZTEzM2tuNjUwNjJ2eTF0In0.EkWyHzK4TNDcWz2in66X8w";

var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryURL, function(data){
    featureCollection(data.features);
});

function featureCollection(earthquakeData) {
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachfeature: function(feature, layer) {
            layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +"</h3><h3>Location: "+ feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        },
        pointToLayer: function(features, latlng) {
            var geoJSONMarker = {
                radius: markerSize(features.properties.mag),
                fillColor: fillColor(features.properties.mag),
                fillOpacity: 0.8,
                color: "pink",
                weight: 0.5,
                stroke: true,
                opacity: 0.5,
            };

            return L.circleMarker(latlng, geoJSONMarker);
        },
    })
    createMap(earthquakes);
};

function createMap(earthquakes) {
    // Define variables for our tile layers
    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.light",
      accessToken: API_KEY
    });
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
    
    // Only one base layer can be shown at a time
    var baseMaps = {
      Light: lightmap,
      Dark: darkmap
    };

    // Overlays that may be toggled on or off
    var overlayMaps = {
        "Earthquakes": earthquakes
    };
    // Create map object and set default layers
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 6,
        layers: [lightmap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(map);
}

function fillColor(mag) {
    switch (mag) {
        case mag >= 5.0:
            return '#d63027';
        case mag >= 4.0:
            return '#f78a57';
        case mag >= 3.0:
            return '#ffe18c';
        case mag >= 2.0:
            return '#d9ef8b';
        case mag >= 1.0:
            return '#d7ed8a';
        case mag < 1.0:
            return '#1a964f';
    };
};

function markerSize(mag) {
    return mag * 4
};