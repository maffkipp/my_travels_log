// VARIABLES
var map;
var userid;
var toggle = 0;

// FUNCTION CALLS
$(document).ready(function() {

  console.log('application is running');

  formUserId = $('#form-userid').val();
  // initialize the map
  initMap();
  // assign event handler to display switch button
  $('#display-switch').click( function() {
    displaySwitch();
  });

  // ajax call to create list of locations visited
  $.ajax({
    method: 'GET',
    url: '/locations/' + formUserId,
    dataType: 'json',
    success: onSuccess
  })

  // adds coordinates for locations entered into the form
  $('#location-form').bind('change', function() {
    addLatLong();
  });

});


// FUNCTIONS

// takes ajax data and places it on the dashboard and map
function onSuccess(responseData) {
  responseData.forEach(location => {
    appendLocation(location);
    // adds map markers
    let myLatLng = new google.maps.LatLng(location.lat, location.long);
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: map
    });
  });
}

// creates a list item for a location
function appendLocation(location) {
  let locationVisited = `<li class='place-visited'>
                        <h3 class='list-item'>
                        ${location.city}, ${location.country}
                        </h3>
                        <input id='${location._id}' class='delete-btn' type='button' onClick='deleteUserLocation(this.id);' value='X'>
                        </li>`;
  $('#city-list').append(locationVisited);

}

// gets latitude and longitude for location entered
function addLatLong() {
  var city = $('#city').val();
  var country = $('#country').val();
  $.ajax({
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${city}+${country}&key=AIzaSyBV06Rqe2o_LP8qqrSeusRqs2VSNxAFMrU`,
    dataType: 'json',
    success: latLongSuccess
  })
}

// pulls latitude and logitude values from the api and assigns
// them to hidden form inputs
function latLongSuccess(responseData) {
  $('#lat').val(responseData.results[0].geometry.location.lat);
  $('#long').val(responseData.results[0].geometry.location.lng);
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
       $('#display-switch').html('Display Locations');
      toggle = 1;
    });
  } else {
    $('#location-form').fadeToggle(200, function() {
      $('#city-list').fadeToggle(200);
       $('#display-switch').html('Add City');
      toggle = 0;
    });
  }
}

function deleteUserLocation(locationsId) {
    var deleteThang = locationsId;
    console.log('i felt that dlt btn pressed.');
    console.log('I AM: ' + deleteThang);

    $.ajax({
      method: 'DELETE',
      url: '/locations/' + deleteThang,
      dataType: 'json',
      success: onSuccessDeleteLocation,
      error: onErrorDeleteLocation
    });
}

function onSuccessDeleteLocation(responseData){
  console.log('onSuccessDeleteLocation was called.');
}

function onFailureDeleteLocation(responseData){
  console.log('I am like totes erroring out from ajax delete');
}

