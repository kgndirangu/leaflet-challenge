// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  console.log(data)
 });

//DAY 1 ACTIVITY 6
//Define a markerSize() function that will give each earthquake a different radius based on magnitude
//When to use features versus feature 
function markerSize(mag) {
  return feature.properties.mag * 100000;
 }



function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  
   
  }
  
  // Loop through the cities array, and create one marker for each city object.
  // for (let i = 0; i < feature.length; i++) {
  //   L.circle(feature[i].properties.mag, {
  //     fillOpacity: 0.75,
  //     color: "white",
  //     fillColor: "purple",
  //     // Setting our circle's radius to equal the output of our markerSize() function:
  //     // This will make our marker's size proportionate to its population.
  //     radius: markerSize(feature[i].properties.mag)
  //   });
  //   //bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
  // }
    //where is h3? 
   // layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  //}

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });


  
  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
//}

function createMap(earthquakes) {

  // Create the base layers.
  //   // Adding a tile layer (the background map image) to our map:

  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create initial map object, giving it the streetmap and earthquakes layers to display on load.
// // We set the longitude, latitude, and starting zoom level (higher number -> closer zoom) 
// This gets inserted into the div with an id of "map".
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 3,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  //   // We use the addTo() method to add objects to our map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}


 
//   // Creating a new marker:
//   //ADDED MARKER TO PORTLAND CITY CENTER
// // We pass in some initial options, and then add the marker to the map by using the addTo() method.
// let marker = L.marker([45.52, -122.67], {
//     draggable: true,
//     title: "My First Marker"
//   }).addTo(myMap);
  
//   // Binding a popup to our marker
//   marker.bindPopup("Hello There!");

  //Day 1 Activity 3
  // Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
// for (let i = 0; i < cities.length; i++) {
//     let city = cities[i];
//     L.marker(city.location)
//       .bindPopup(`<h1>${city.name}</h1> <hr> <h3>Population ${city.population.toLocaleString()}</h3>`)
//       .addTo(myMap);
  }
