var initialLocation;
var map;
var myLat;
var myLon;
closestStation = new Object;
browserSupportFlag =  new Boolean();
content = new Array;
output = new Array;
wheres = new Array;
marker = new Array;
infowindows = new Array;

stations = [
  ['Alewife', 42.395428, -71.142483, 22, 'RALEN', 'EOL'],
  ['Davis', 42.39674, -71.121815, 21, 'RDAVN', 'RDAVN'],
  ['Porter', 42.3884, -71.119149, 20, 'RPORN', 'RPORS'],
  ['Harvard', 42.373362, -71.118956, 19, 'RHARN', 'RHARS'],
  ['Central', 42.365486, -71.103802, 18, 'RCENN', 'RCENS'],
  ['Kendall', 42.36249079, -71.08617653, 17, 'RKENN', 'RKENS'],
  ['Charles MGH', 42.361166, -71.070628, 16, 'RMGHN', 'RMGHS'],
  ['Park', 42.35639457, -71.0624242, 15, 'RPRKN', 'RPRKS'],
  ['Downtown Crossing', 42.355518, -71.060225, 14, 'RDTCN', 'RDTCS'],
  ['South Station', 42.352271, -71.055242, 13, 'RSOUN', 'RSOUS'],
  ['Broadway', 42.342622, -71.056967, 12, 'RBRON', 'RBROS'],
  ['Andrew', 42.330154, -71.057655, 11, 'RANDN', 'RANDS'],
  ['Saven Hill', 42.31129, -71.053331, 10, 'RSAVN', 'RSAVS'],
  ['Fields Corner', 42.300093, -71.061667, 9, 'RFIEN', 'RFIES'],
  ['Shawmut', 42.29312583, -71.06573796, 8, 'RSHAN', 'RSHAS'],
  ['Ashmont', 42.284652, -71.064489, 7, 'EOL', 'RASHS'],
  ['JFK', 42.320685, -71.052391, 6, 'RJFKN', 'RJFKS'],
  ['North Quincy', 42.275275, -71.029583, 5, 'RNQUN', 'RNQUS'],
  ['Wollaston', 42.2665139, -71.0203369, 4, 'RWOLN', 'RWOLS'],
  ['Quincy Center', 42.251809, -71.005409, 3, 'RQUCN', 'RQUCS'],
  ['Quincy Adams', 42.233391, -71.007153, 2, 'RQUAN', 'RQUAS'],
  ['Braintree', 42.2078543, -71.0011385, 1, 'EOL', 'RBRAS']
];

  function initialize() {
      var mapOptions = {
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      map = new google.maps.Map(document.getElementById("map_canvas"), 
          mapOptions);
      setMarkers(map, stations);
      drawPolyline(map);
      if(navigator.geolocation) {
          browserSupportFlag = true;
          navigator.geolocation.getCurrentPosition(function(position) {
              myLat = position.coords.latitude;
              myLon = position.coords.longitude;
              initialLocation = new google.maps.LatLng(myLat, myLon);
              map.setCenter(initialLocation);
              markLocation(map, initialLocation);
              findPeople();
          }, function() {
              handleNoGeolocation(browserSupportFlag);
          });
      }
      else {
          browserSupportFlag = false;
          handleNoGeolocation(browserSupportFlag);
      }
  }

  //--------------------------BEGIN MARKERS----------------------------//


function setMarkers(map, locations) {
    // Add markers to the map
    var image = {
        url: 'images/marker.png',
        size: new google.maps.Size(20, 28),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 28)
    };
    var shadow = {
        url: 'images/markershadow.png',
        size: new google.maps.Size(37, 30),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 30)
    };
    var shape = {
        coord: [1, 1, 1, 20, 18, 20, 18 , 1],
        type: 'poly'
    };
    for (var i = 0; i < locations.length; i++) {
        var station = locations[i];
        var myLatLng = new google.maps.LatLng(station[1], station[2]);
        marker[i] = new google.maps.Marker({
            position: myLatLng,
            map: map,
            shadow: shadow,
            icon: image,
            shape: shape,
            title: station[0],
            zIndex: station[3]
        });
        addInfo(marker[i], i);
    }
    function addInfo(marker, index) {
        var infowindow = new google.maps.InfoWindow({
            maxWidth: 300,
            maxHeight: 400,
        });
        infowindows.push(infowindow);
        var contentString = "";
        google.maps.event.addListener(marker, 'click', function() {
            closeInfoWindows();
            redline = new XMLHttpRequest();
            redline.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
            redline.send(null);
            redline.onreadystatechange = function() {
                if (redline.readyState == 4) {
                    if (redline.status == 200) {
                        content = JSON.parse(redline.responseText);
                        contentString = '<div id="initial">'+
                            stations[index][0] + '</div><table><tr><td>Trip</td>'
                            + '<td>Direction </td><td> Arriving In </td></tr>';
                        for (var j = 0; j < content.length; j++) {
                            if (content[j]["PlatformKey"] == stations[index][4] &&
                                content[j]["InformationType"] == "Predicted") 
                            {
                                contentString += '<tr><td>' + content[j]["Trip"] +
                                '</td><td>' + '<td>North</td>' + '<td>' + content[j]["TimeRemaining"]
                                + '</td></tr>';
                            }
                            if (content[j]["PlatformKey"] == stations[index][5] &&
                                content[j]["InformationType"] == "Predicted")
                            {
                                contentString += '<tr><td>' + content[j]["Trip"] +
                                '</td><td>' + '<td>South</td>' + '<td>' + content[j]["TimeRemaining"]
                                + '</td></tr>';
                            }
                        }
                        contentString += '</table>';
                    }
                }
            };
            infowindow.setContent(contentString);
            infowindow.open(map, this);
        });
    }
    function closeInfoWindows() {
        for (var i = 0; i < infowindows.length; i++) {
          infowindows[i].close();
        }
    }
}
//----------------END MARKERS----------------------------//

//-----------------BEGIN POLYLINE----------------------------//

function drawPolyline(map) {
    var ashmontCoordinates = new Array;
    for (var i = 0; i < 16; i++) {
        var station = stations[i];
        ashmontCoordinates[i] = new google.maps.LatLng(station[1], station[2]);
    }
    var braintreeCoordinates = new Array;
    for (var i = 15; i < stations.length; i++) {
        var station;
        if (i == 15)
            station = stations[11];
        else 
            station = stations[i];
        braintreeCoordinates[i-15] = new google.maps.LatLng(station[1], station[2]);
    }
    var ashmontPath = new google.maps.Polyline({
        path: ashmontCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 4
    });
    var braintreePath = new google.maps.Polyline({
        path: braintreeCoordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 4
    });
    ashmontPath.setMap(map);
    braintreePath.setMap(map);
}

//-----------------END POLYLINE----------------------------//

  function handleNoGeolocation(errorFlag) {
      var boston = new google.maps.LatLng(42.3583, -71.0603);
      if (errorFlag == true) {
          alert("Geolocation service failed.");
      } else {
          alert("Your browser doesn't support geolocation. We've placed you in central Boston.");
      }
      initialLocation = boston;
      map.setCenter(initialLocation);
  }

  function markLocation(map, initialLocation) {
      var image = {
          url: 'images/location.png',
          size: new google.maps.Size(20, 23),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 23)
      };
      var shape = {
          coord: [1, 1, 1, 20, 18, 20, 18 , 1],
          type: 'poly'
      };
      marker = new google.maps.Marker({
          position: initialLocation,
          map: map,
          icon: image,
          shape: shape,
          title: "Your location",
          zIndex: 1
      });
      findNearestSubway(map, myLat, myLon);
      var contentString = "<div id='initial'>You are here!" +
                          "<p>Closest subway is " + closestStation["name"] + 
                          " which is approximately " + closestStation["distance"] +
                          " miles away. </p></div>";
      var infowindow = new google.maps.InfoWindow({
          maxWidth: 300,
          content: contentString
      });
      infowindow.open(map, marker);
      google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
      });
  }

  function findNearestSubway(map, initialLocation) {
      var shortest = computeDistance(myLat, myLon, stations[0][1], stations[0][2]);
      var index = 0;
      for (i = 1; i < stations.length; i++) {
          var distance2 = computeDistance(myLat, myLon, stations[i][1], stations[i][2]);
          if (distance2 < shortest) {
              shortest = distance2;
              index = i;
          }
      }
      closestStation["name"] = stations[index][0];
      closestStation["distance"] = shortest.toPrecision(4);
  }

  function computeDistance(my_lat, my_long, other_lat, other_long) {
      var R = 6371*.621371; // mi
      var lat1 = my_lat;
      var lon1 = my_long;
      var lat2 = other_lat;
      var lon2 = other_long;
      var dLat = (lat2-lat1)*Math.PI/180;
      var dLon = (lon2-lon1)*Math.PI/180;
      lat1 = lat1*Math.PI/180;
      lat2 = lat2*Math.PI/180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
  }

	
// -------------------------- JSON PARSING -------------------------------------//

  function findPeople() {
      try {
          where = new XMLHttpRequest();
      }
      catch (error) {
          alert("people error");
      }
      finally {
          if (where != null) {
              where.onreadystatechange = placePeople;
          }
      }
      where.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
      where.send(null);
  }

  function placePeople() {
      if (this.readyState == 4) {
          if (this.status == 200) {
              var wheres = JSON.parse(this.responseText);
              for (var i = 0; i < wheres.length; i++) {
                  wheres[i]["location"] = new google.maps.LatLng(wheres[i]["loc"]["latitude"], 
                                                                 wheres[i]["loc"]["longitude"]);
                  if (wheres[i]["name"] == "Carmen Sandiego") {
                      markCarmen(wheres[i]);
                  }
                  else {
                      markWaldo(wheres[i]);
                  }
              }
          }
      }
  }

  function markCarmen(person) {
      var image = {
          url: 'images/carmen.png',
          size: new google.maps.Size(50, 50),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 50)
      };
      var marker = new google.maps.Marker({
          position: person["location"],
          map: map,
          icon: image,
          shape: shape,
          title: "Carmen Sandiego",
          zIndex: 1
      });
      var shape = {
          coord: [1, 1, 1, 20, 18, 20, 18 , 1],
          type: 'poly'
      };
      var distance = computeDistance(myLat, myLon, 
                                    person["loc"]["latitude"],
                                    person["loc"]["longitude"]);
      var distanceStr = distance.toString();
      var infowindow = new google.maps.InfoWindow({
          maxWidth: 300,
          content: '<div id="initial"> Congrats! <p> You found Carmen at ' +
                    person["loc"]["note"] + '. Approximately ' + 
                    distanceStr + ' miles away from your location. </p></div>'
      });
      google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
      });
      infowindow.open(map, marker);
  }

  function markWaldo(person) {
      var image = {
          url: 'images/waldo.png',
          size: new google.maps.Size(50, 60),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 60)
      };
      var marker = new google.maps.Marker({
          position: person["location"],
          map: map,
          icon: image,
          shape: shape,
          title: "Waldo",
          zIndex: 1
      });
      var shape = {
          coord: [1, 1, 1, 20, 18, 20, 18 , 1],
          type: 'poly'
      };
      var distance = computeDistance(myLat, myLon, 
                                    person["loc"]["latitude"],
                                    person["loc"]["longitude"]);
      var distanceStr = distance.toString();
      var infowindow = new google.maps.InfoWindow({
          maxWidth: 300,
          content: '<div id="initial"> Congrats! <p>' +
                    person["loc"]["note"] + ' He is approximately ' + 
                    distanceStr + ' miles away from your location.</p></div>'
      });
      google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
      });
      infowindow.open(map, marker);
  }

// -------------------------- JSON PARSING -------------------------------------//