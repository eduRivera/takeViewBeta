$(document).ready(function(){
google.maps.event.addDomListener(window, 'load', initializeStreetView);
    var divIconClone = $("#containerIcons").clone();
    var divDropClone = $("#dropBox").clone();
  
    var num = document.getElementById("route_id").value;
    $.ajax({
      url: '/takeview/show/'+num,
      dataType: 'json',
      success: function(data) {
        initializeStreetView(data, 0);
        showPositionIntoMiniMap(data, 0);

      },
      error: function() {
        console.log("No entra");
      }
    });
     
    
});
  //******************************DOCUMENT.READY END*******************************************
//**********variable globales***********//
var resultAjax = $.ajax({
      url: '/takeview/show/14',
      dataType: 'json',
      success: function(data) {
        initializeStreetView(data, 0);
        showPositionIntoMiniMap(data, 0);

      },
      error: function() {
        console.log("No entra");
      }
});
var iteratorArray = 0;
/****************************/
function slideTransition(latlon){
  initializeStreetView(latlon, null);

  var arrayPoints = resultAjax.responseJSON;
  var iterArray = arrayPoints.indexOf(latlon);
  showPositionIntoMiniMap(arrayPoints, iterArray)

}

function loadGoogleApi() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?v=3.exp&callback=initializeStreetView";
  document.body.appendChild(script);
}
  function positionOfInterator(data){
    if (data.length == iteratorArray +1){
        return iteratorArray = 0;
    }else{
        return iteratorArray = iteratorArray+1; 
    }
  }
  function changeInteratorWhenClickOnPointOfMiniMap(newIterator){
    iteratorArray = newIterator;
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
      //per definir el color i la forma dels punts del mapa

      for ( var i = 0 ; i < data.length ; i++){
        //funcio per escollir el tipus de point del mini map
         var pinImage = typeOfPointMiniMap(i, iteratorArray);
         var coord = separateLatAndLon(data, i);
         var lat = coord[0];
         var lon = coord[1];
         var LatLng = new google.maps.LatLng(lat,lon);
         var marker = new google.maps.Marker({
         position: LatLng ,
         icon: pinImage,
         map: map,
         myLatLon: [lat, lon],
         coord: data,
         iteratorArray: i
         });
          
         google.maps.event.addListener(marker, 'click', function() {
          changeInteratorWhenClickOnPointOfMiniMap(this.iteratorArray);
          initializeStreetView(this.coord, this.iteratorArray );
          showPositionIntoMiniMap(this.coord, this.iteratorArray );

         });
         flightPlanCoordinates.push(new google.maps.LatLng(lat,lon));

      }
      //hacer que los puntos se unan con una linea roja
      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      }); 
      flightPath.setMap(map);
      //hacer mas grande el contenedor del mini mapa cuando pasemos el raton por encima
      // var miniMap = document.getElementById('mini-map');
      // google.maps.event.addListener(map, 'mouseover', function() {
      //   miniMap.style['width'] = '300px';
      //   miniMap.style['height'] = '200px';
                
      // });
      // google.maps.event.addListener(map, 'mouseout', function() {
      //   miniMap.style['width'] = '180px';
      //   miniMap.style['height'] = '120px';
      // });
      
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
    if(iteratorArray==null){
      var coord_0 = data.split(',')
      return coord_0
    }else{
       var coord = data[iteratorArray];
       coord = coord.split(',');
       return coord;
    }
   
  }
  

