// VARIABLES
var map;
var toggle = 0;


// FUNCTION CALLS
$(document).ready(function() {

  console.log('application is running');
  // initialize the map
  initMap();
  // assign event handler to display switch button
  $('#display-switch').click( function() {
    displaySwitch();
  });

});


// FUNCTIONS

// Initialize the map API
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 2
  });
}

// Switch between location form and list of saved locations
function displaySwitch() {
  if (toggle === 0) {
    $('#city-list').fadeToggle(200, function() {
      $('#location-form').fadeToggle(200);
      toggle = 1;
    });
  } else {
    $('#location-form').fadeToggle(200, function() {
      $('#city-list').fadeToggle(200);
      toggle = 0;
    });
  }
}

