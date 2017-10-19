// VARIABLES
var map,
    userid,
    toggle = 0,
    statToggle = 0;

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

  //passing click event for statistics
  $('#display-stats').click(function(){
    toggleStats();
  })
  // ajax call to create list of locations visited
  populateLocationList();

  // adds coordinates for locations entered into the form
  $('#location-form').bind('change', function() {
    addLatLong();
  });

});


// FUNCTIONS

function toggleStats() {
  if (statToggle === 0) {
    statAjaxCall();
    $('#display-stats').html('Hide Stats');
    statToggle = 1;
  } else {
    $('#stats').remove();
    $('#display-stats').html('Check Stats');
    statToggle = 0;
  }
}

function statAjaxCall() {
  $.ajax({
      method: 'GET',
      url: `/users/${formUserId}/stats`,
      dataType: 'json',
      success: statsSuccess
    })
}

//Displays stats on dom
function statsSuccess(responseData){
  console.log(`We got yer data!`);
  console.log(responseData);
  var toAppend = `<div id='stats'><p>${responseData.cityCount} Cities Visited</p>
                  <p>${responseData.countryCount} Countries Visited</p></div>`;
  $('#stats').remove();
  $('.stats-page').append(toAppend);
}


// Initialize the map API
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 1
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

function populateLocationList() {
  $.ajax({
    method: 'GET',
    url: '/locations/' + formUserId,
    dataType: 'json',
    success: onSuccess
  })
}


// takes ajax data and places it on the dashboard and map
function onSuccess(responseData) {
  responseData.forEach(location => {
    appendLocation(location);
    addMarker(location);
  });
}

function addMarker(location) {
  let myLatLng = new google.maps.LatLng(location.lat, location.long);
  let marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
}

// creates a list item for a location
function appendLocation(location) {
  let locationVisited = `<li class='place-visited'>
                        <h3 class='list-item'>
                        ${location.city}, ${location.country}
                        </h3>
                        <button id='${location._id}-btn'>
                        <img src='/img/trash-can-icon.png'>
                        </button>
                        </li>`;
  $('#city-list').append(locationVisited);
  
  $(`#${location._id}-btn`).click(function() {
    updateUserLocationRefRemove(location._id);
    deleteUserLocation(location._id);
    $('.place-visited').remove();
    initMap();
    populateLocationList();
  });
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
    zoom: 1
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
/**
UPDATE / PATCH TO REMOVE USER LOCATION REF OF LOCATIONS BEING DELETED.
**/
function updateUserLocationRefRemove(locationId) {

    const formUser = $('#form-userid').val();
    console.log('delete button pressed, I am PATCH to this route: /users/' + formUser + '/' + locationId);
    $.ajax({
      method: 'PATCH',
      url: '/users/' + formUser +'/' + locationId,
      dataType: 'json',
      success: onSuccessPatchUserLocations,
      error: onErrorPatchUserLocations
    });
}

function onSuccessPatchUserLocations(responseData){
  console.log('onSuccessPatchUserLocations was called.' + JSON.stringify(responseData));
}

function onErrorPatchUserLocations(responseData){
  console.log('i am AJAX failure responseData from onErrorPatchUserLocations' +  JSON.stringify(responseData));
}


/**
DELETING A LOCATION BELONGING TO A USER WHO CLICKED A X BUTTON.
**/

function deleteUserLocation(locationId) {
    const formUser = $('#form-userid').val();
    console.log('delete button pressed, I am DELETE to this route: /users/' + formUser + '/' + locationId);
    $.ajax({
      method: 'DELETE',
      url: '/users/' + formUser +'/' + locationId,
      dataType: 'json',
      success: onSuccessDeleteLocation,
      error: onErrorDeleteLocation
    });
}

function onSuccessDeleteLocation(responseData){
  console.log('onSuccessDeleteLocation was called.' + JSON.stringify(responseData));
}

function onErrorDeleteLocation(responseData){
  console.log('i am AJAX failure responseData from onErrorDeleteLocation' +  JSON.stringify(responseData));
}

