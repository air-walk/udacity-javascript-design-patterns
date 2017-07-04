var locations = [
  { name: "Neelam Chowk Ajronda", lat: 28.3976295, lng: 77.31232519999999 },
  { name: "Faridabad Old",        lat: 28.410672,  lng: 77.31134          },
  { name: "Badkhal Mor",          lat: 28.422814,  lng: 77.310278         },
  { name: "Sector 28",            lat: 28.4382752, lng: 77.30896249999999 },
  { name: "Khan Market",          lat: 28.6020358, lng: 77.22922059999999 }
];

var Marker = function(data) {
  this.name = ko.observable(data.name);
  this.lat  = ko.observable(data.lat);
  this.lng  = ko.observable(data.lng);
}

var ViewModel = function() {
  var self     = this;
  this.markers = ko.observableArray([]);

  locations.forEach(function(location) {
    self.markers.push(new Marker(location));
  });

  this.currentMarker = ko.observable(this.markers()[0]);

  this.setCurrentMarker = function(marker) {
    console.log("Setting current marker as: " + marker.name());
    self.currentMarker(marker);
  };
}

ko.applyBindings(new ViewModel());


/* Callback method for rendering Google Map */
function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map   = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: uluru
  });

  /* var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });

  var bulru = {lat: -25.363, lng: 101.044}
  var marker2 = new google.maps.Marker({
    position: bulru,
    map: map
  });*/
}