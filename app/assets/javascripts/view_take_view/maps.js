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
     
    $("#next-point").click(function(){
      $.ajax({
        url: "/view/"+num+"/show",
        dataType: 'json',
        success: function(data) {
          var resultIterator = positionOfInterator(data);
          haveCommentsOrImages(data, resultIterator);
          initializeStreetView(data, resultIterator);
          showPositionIntoMiniMap(data, resultIterator);
        },
        error: function() {
          console.log("No entra");
        }
     });
    });
    function showPositionIntoMiniMap(data, iteratorArray) {
      resetIcons(divIconClone, divDropClone)
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
          haveCommentsOrImages(this.coord, this.iteratorArray);
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
      var miniMap = document.getElementById('mini-map');
      google.maps.event.addListener(map, 'mouseover', function() {
        miniMap.style['width'] = '300px';
        miniMap.style['height'] = '200px';
                
      });
      google.maps.event.addListener(map, 'mouseout', function() {
        miniMap.style['width'] = '180px';
        miniMap.style['height'] = '120px';
      });
      
    }
});
  //******************************DOCUMENT.READY END*******************************************
  //variable globales
var iteratorArray = 0;
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
      alert(data);
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
  // //funcions pel drag an drop
  // function allowDrop(ev) {
  //   ev.preventDefault();  
  // }
  // function drag(ev) {
  //   ev.dataTransfer.setData("Text", ev.target.id);
  //   var dropBox = document.getElementById('dropBox');
  //   dropBox.classList.add('drop-box-active');
  // }
  // function drop(ev) {
  //   ev.preventDefault();
  //   var data = ev.dataTransfer.getData("Text");

  //   var elementDrop = ev.target.appendChild(document.getElementById(data));
  //   typeOfPopUp = whatIconIs(elementDrop.id);
  //   openPopUp();
  //   //activem el box on es fara el drop
  //   var dropBox = document.getElementById('dropBox');
  //   dropBox.classList.remove('drop-box-active');
  //   dropBox.classList.add('drop-box');

  //   elementDrop.classList.add('image-drop');
  //   //afegim un eventListener que al fer click sobre licona que ja s'ha fet drop obri un altre cop el pop up
  //   document.getElementById(elementDrop.id).addEventListener("click", openPopUp);
  // }
  // function dropInitial(ev) {
  //   ev.preventDefault();
  //   var data = ev.dataTransfer.getData("Text");
  //   var elementDrop = ev.target.appendChild(document.getElementById(data));
  //       //activem el box on es fara el drop
  //   var dropBox = document.getElementById('dropBox');
  //   dropBox.classList.remove('drop-box-active');
  //   dropBox.classList.add('drop-box');

  //   elementDrop.classList.remove('image-drop');
  //   //fem un remove del eventListener perque quan fagin un click quan licona torna a estar a la seva posicio inicial no surti el popup
  //   document.getElementById(elementDrop.id).removeEventListener("click", openPopUp);
  // }
  function whatIconIs(element, value){
    if(element == "drag1"){
      openPopUp("#openModalDrag1")
    }else if (element == "drag2"){
      openPopUp("#openModalDrag2")
    }
  }
  function openPopUp(typeOfPopUp){
    window.open(typeOfPopUp,"_self");
  }
  // document.addEventListener("dragend", function( event ) {
  //   // reset the transparency
  //   var dropBox = document.getElementById('dropBox');
  //   dropBox.classList.remove('drop-box-active');
  //   dropBox.classList.add('drop-box');
  // }, false);
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
  function resetIcons(iconClone, dropBoxClone){
    $("#containerIcons").replaceWith(iconClone.clone());
    $("#dropBox").replaceWith(dropBoxClone.clone());
  }
  function separateLatAndLon(data, iteratorArray){
    var coord = data[iteratorArray];
    coord = coord.split(',');
    return coord;
  }

