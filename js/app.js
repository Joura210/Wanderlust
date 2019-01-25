// Initialize Firebase
var config = {
  apiKey: "AIzaSyA2A-jWkwcWqBB6Sncu8yYLHP1ZNDG2jhg",
  authDomain: "awesomeness-awaits-dfc50.firebaseapp.com",
  databaseURL: "https://awesomeness-awaits-dfc50.firebaseio.com",
  projectId: "awesomeness-awaits-dfc50",
  storageBucket: "",
  messagingSenderId: "342403899308"
};
firebase.initializeApp(config);

var data = firebase.database()

var map;
var APIKey = "6f659bddea416b7a78307f68b0c08fef";
var countriesList = document.getElementById("countries");
var countries; 


$("#btn").on("click", function() {
  console.log("Country in dropdown", $("#countries").val());
  displayCountryInfo($("#countries").val());
  var userName = $("#yourName").val();
  var userEmail = $("#yourEmail").val();
  $("#userNameDisplay").text(" " + userName);

  var user = {

    name: userName,
    email: userEmail,
  
  };
  
  data.ref().push(user);
  event.preventDefault(); 
  localStorage.clear();
 localStorage.setItem("name", userName); 


  console.log(userName);
  console.log(userEmail);

})

$("#userNameDisplay").text(" " + localStorage.getItem("name"));

//Ajax call for RESTCountries API
$.ajax({
  url: "https://restcountries.eu/rest/v2/all?api_key=" + APIKey,
  method: "GET"
})
.then(function(data) {
  console.log(data);
  countries = data;
    //console.log(countries);
    //console.log("Capital of " + countries[0].name + " is " + countries[0].capital);
    //console.log(`The capital of ${countries[0].name} is ${countries[0].capital}`)
  var options = "";
  for (var i = 0; i < countries.length; i++) {
      options += `<option value="${countries[i].capital}">${countries[i].name}</option>`

  }
  countriesList.innerHTML = options;

})

function displayCountryInfo(countryByCapital) {
  var countryData = countries.find(country => country.capital === countryByCapital);
  console.log(countryData);
  
  document.getElementById("language").innerHTML = countryData.languages[0].name;
  document.getElementById("currency").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name}  ${c.symbol}`).join(", ");
  document.getElementById("capital").innerHTML = countryData.capital;

  //Ajax call for weather
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + countryData.capital + "&units=imperial&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(data) {
    console.log("Weather", data);
    var uluru = {lat: countryData.latlng[0], lng: countryData.latlng[1]};
// The map, centered at Uluru
    map = new google.maps.Map(
    document.getElementById('map'), {zoom: 3, center: uluru});
// The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
// Weather Info
    $("#wind").empty();
    $("#wind").append("<div>" + data.wind.speed + "</div>")
    $("#temp").empty();
    $("#temp").append("<div>" + data.main.temp + "</div>")
    $("#humidity").empty();
    $("#humidity").append("<div>" + data.main.humidity + "</div>")
  })
};


// Map Details
function initMap() {
console.log("inside the init map");
// The location of Uluru
var uluru = {lat: 28.521910, lng: 69.2075};
// The map, centered at Uluru
map = new google.maps.Map(
    document.getElementById('map'), {zoom: 3, center: uluru});
// The marker, positioned at Uluru
var marker = new google.maps.Marker({position: uluru, map: map});
};

// World Map Info //

$(document).ready(function(){

// CSSMap;
$("#map-continents").CSSMap({
"size": 750,
"tooltips": "floating-top-center",
"responsive": "auto"
});
// END OF THE CSSMap;
var userName = localStorage.getItem("name")
if(userName !== null){
  $("#userNameDisplay").text(" " + userName);
}else{
  $("#userNameDisplay").text(" " + "Traveler");
}
});


// $("#submit").on("click", function () {
//   event.preventDefault(); 
 
//   name = $("#your_name").val().trim();
//   email = $("#email").val().trim();
//   localStorage.clear();
//   localStorage.setItem("name", name);
//   localStorage.setItem("email", email);

  
//  });
