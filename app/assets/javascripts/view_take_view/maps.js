$(document).ready(function(){
  google.maps.event.addDomListener(window, 'load', initializeStreetView);

  var routeId = document.getElementById("route_id").value;
  resultAjax = ajaxRequestPoints(routeId);
        
});
//******************************DOCUMENT.READY END*******************************************
//**********global variables***********//
var resultAjax;
/****************************/

function loadGoogleApi() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?v=3.exp&callback=initializeStreetView";
  document.body.appendChild(script);
}
//this function is called in show.js
function slideTransition(latlon){
  initializeStreetView(latlon, null);
  var arrayPoints = resultAjax.responseJSON;
  var iterArray = arrayPoints.indexOf(latlon);
  showPositionIntoMiniMap(arrayPoints, iterArray);
}

function initializeStreetView(data, iteratorArray) {
  var coord = separateLatAndLon(data, iteratorArray);
  var lat = coord[0];
  var lon = coord[1];
  var bryantPark = new google.maps.LatLng(lat, lon);
  var panoramaOptions = {
    position: bryantPark,
    pov: {
      heading: 165,
      pitch: 0
    },
    zoom: 1
  };
  var myPano = new google.maps.StreetViewPanorama(document.getElementById('map-canvas'),panoramaOptions);
  myPano.setVisible(true);
}

function showPositionIntoMiniMap(data, iteratorArray) {
  var coord = separateLatAndLon(data, iteratorArray);
  var lat = coord[0];
  var lon = coord[1];
  var myOptions = {
    center: new google.maps.LatLng(lat, lon),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("mini-map"),myOptions);
  
  var flightPlanCoordinates = new Array;

  var latBefore;
  var lonBefore;
  for ( var i = 0 ; i < data.length ; i++){
     var coord = separateLatAndLon(data, i);
     var lat = coord[0];
     var lon = coord[1];
     if (latBefore != lat && lonBefore != lon){
       latBefore = lat;
       lonBefore = lon;
       var pinImage = typeOfPointMiniMap(i, iteratorArray);
       var LatLng = new google.maps.LatLng(lat,lon);
       var marker = new google.maps.Marker({
         position: LatLng ,
         icon: pinImage,
         map: map,
         myLatLon: [lat, lon],
         coord: data,
         iteratorArray: i
       });
     }
     flightPlanCoordinates.push(new google.maps.LatLng(lat,lon));
  }
  //hacer que los puntos se unan con una linea roja
  var flightPath = pointsUnitedByLine(flightPlanCoordinates) 
  flightPath.setMap(map);
}

function ajaxRequestPoints(idRoute){
  var result = $.ajax({
                  url: '/takeview/show/14',
                  dataType: 'json',
                  success: function(data) {
                      showPositionIntoMiniMap(data, 0);
                      initializeStreetView(data, 0);
                  },
                  error: function() {
                    console.log("No entra");
                  }
 
                });
  return result;
}

function typeOfPointMiniMap(iteratorPoints, iteratorArray){
  var pinColor = "";
  if( iteratorPoints == iteratorArray ){
    pinColor = "6BC29D";
  }else {
    pinColor = "CA5243";
  }
  var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
    new google.maps.Size(21, 34),
    new google.maps.Point(0,0),
    new google.maps.Point(10, 34));
  return pinImage;
}
function separateLatAndLon(data, iteratorArray){
  var coord; 
  if(iteratorArray==null){
    coord = data
  }else{
    coord = data[iteratorArray];
  }
  coord = coord.split(',');
  return coord;
}
function pointsUnitedByLine(flightPlanCoordinates){
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  return flightPath;
}

