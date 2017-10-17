// VARIABLES
var map;
var userid;
var toggle = 0;


// FUNCTION CALLS
$(document).ready(function() {

  console.log('application is running');

  formUserId = $('#form-userid').val();
  console.log(formUserId);
  // initialize the map
  initMap();

  // assign event handler to display add location button
  $('#display-switch').click( function() {
    displaySwitch();
  });


  $.ajax({
    method: 'GET',
    url: '/locations/' + formUserId,
    dataType: 'json',
    success: onSuccess
  })
});


// FUNCTIONS

function onSuccess(responseData) {
  responseData.forEach(location => {
    console.log(location);
    let locationVisited = `<li class='place-visited'><h3 class='list-item'>${location.city}, ${location.country}</h3></li>`;
    $('#city-list').append(locationVisited);
    let myLatLng = new google.maps.LatLng(parseInt(location.lat), parseInt(location.long));
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: map
    });
  });
}

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
      $('#display-switch').html('Display My Locations');
      toggle = 1;
    });
  } else {
    $('#location-form').fadeToggle(200, function() {
      $('#city-list').fadeToggle(200);
      $('#display-switch').html('Create New Location');
      toggle = 0;
    });
  }
}


