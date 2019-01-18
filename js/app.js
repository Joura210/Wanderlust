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

//Initial values
var userName = "";
var email = "";
var city = "";
var country = "";


//Adds user information information to the database
$(".form-field").on("keyup", function () {
 var usertemp = $("#user-name").val().trim();
 var emailtemp = $("#email").val().trim();
 var citytemp = $("#city").val().trim();
 var countrytemp = $("#country").val().trim();

 sessionStorage.setItem("user", usertemp);
 sessionStorage.setItem("email", emailtemp);
 sessionStorage.setItem("city", citytemp);
 sessionStorage.setItem("country", countrytemp);
});
//Takes item added to database once submit is clicked
$("#user-name").val(sessionStorage.getItem("user"));
$("#email").val(sessionStorage.getItem("email"));
$("#city").val(sessionStorage.getItem("city"));
$("#country").val(sessionStorage.getItem("country"));

$("#submit").on("click", function (event) {
 event.preventDefault();
 //If input values are missing a alert will notify user to fill in all details
 if ($("#user-name").val().trim() === "" ||
   $("#email").val().trim() === "" ||
   $("#city").val().trim() === "" ||
   $("#country").val().trim() === "") {

   alert("Please fill in all details to add new user");

 } else {
   //If input values are complete
   userName = $("#user-name").val().trim();
   email = $("#email").val().trim();
   city = $("#city").val().trim();
   country = $("#country").val().trim();

   $(".form-field").val("");

   database.ref().push({
     userName: userName,
     email: email,
     city: city,
     country: country,
     dateAdded: firebase.database.ServerValue.TIMESTAMP
   });
   // Clears the data saved in session storage
   sessionStorage.clear();
 }

});


// This is our API key for OpenWeatherMap
var APIKey = "6f659bddea416b7a78307f68b0c08fef";
// Here we are building the URL we need to query the database

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
 url: queryURL,
 method: "GET"
})
 // We store all of the retrieved data inside of an object called "response"
 .then(function (response) {

   // Log the queryURL
   console.log(queryURL);

   // Log the resulting object
   console.log(response);

   // Transfer content to html?
   $(".city").html("<h1>" + response.name + " Weather Details</h1>");
   $(".wind").text("Wind Speed: " + response.wind.speed);
   $(".humidity").text("Humidity: " + response.main.humidity);
   $(".temp").text("Temperature (F) " + response.main.temp);

   // Log the data in the console as well
   console.log("Wind Speed: " + response.wind.speed);
   console.log("Humidity: " + response.main.humidity);
   console.log("Temperature (F): " + response.main.temp);
 });
Message Input


Message Angie