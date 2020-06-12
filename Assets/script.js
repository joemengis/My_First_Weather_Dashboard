/** pulls information from the form and builds query url @returns {string} URL for Openweather API based on form input */ 



function buildQueryURL() {
    // Grab text the user typed into the search input, add to the queryParams object
    var userInput = $("#search-term")
    .val()
    .trim();
    
    // set the API key
    var APIKey = "f41db2588c976c36341b4a73e28d5118";
    // url used to query openweather
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + APIKey;
    
return queryURL
};

function buildQueryURLFiveDay() {
  // Grab text the user typed into the search input, add to the queryParams object
  var userInput = $("#search-term")
  .val()
  .trim();
  

  var APIKey = "f41db2588c976c36341b4a73e28d5118";
  // url used to query openweather
  var queryURLFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + APIKey;

return queryURLFiveDay
};






// show 5 day forecast for current city
// save current city as favorite
// make saved cities functional

// Function to empty out the articles
function clear() {
    $("#weather-data").empty();
  }
  



// .on("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
    event.preventDefault();
    // $(".todaysForecast").clear();
    
    // Build the query URL for the ajax request to the OpenWeather API
    var queryURL = buildQueryURL();
    var queryURLFiveDay = buildQueryURLFiveDay();
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
      console.log(response);
      
      // grab date
      var unixTime = (response.dt);
      console.log(unixTime);
      const date = new Date(unixTime*1000);
      var currentDate = (date.toLocaleDateString("en-US"));
      
      // grab kelvin
      var kelvin = (response.main.temp);
      // convert kelvin to celsius
      var celsius = Math.floor(kelvin - 273);
      // convert celsius to farenheit
      var fahrenheit = Math.floor(celsius * (9/5) + 32);
      //  var for humidity
      var humidity = (response.main.humidity);
      // var for wind speed
      var windSpeed = (response.wind.speed);
      // var for city name
      var cityName = (response.name);
      // var for icon code
      var iconCode = response.weather[0].icon;
      // var build icon url
      var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
      

      // clear todays forecast
      $('#wicon').attr('src', iconURL);
      $(".city-name").empty();
      $(".Temp").empty();
      $(".Humidity").empty();
      $(".wind-speed").empty();

      // append new forecast info
      $(".date").append(currentDate);
      $(".city-name").append(cityName);
      $(".Temp").append("Temperature: " + JSON.stringify(fahrenheit)+ "°F");
      $(".Temp").append(" ( " + JSON.stringify(celsius)+ "°C)");
      $(".Humidity").append("Humidity: " + JSON.stringify(humidity)+ "%");
      $(".wind-speed").append("Wind Speed: " + JSON.stringify(windSpeed)+ "MPH");
      
    });

    $.ajax({
        url: queryURLFiveDay,
        method: "GET"
    }).then(function(response) {
      console.log(response);
      // Day 1

      // grab date
      var dayOneUnixTime = (response.list[4].dt);
      console.log(dayOneUnixTime);
      const dayOneDate = new Date(dayOneUnixTime*1000);
      var currentDayOneDate = (dayOneDate.toLocaleDateString("en-US"));

      var dayOneCityName = response.city.name;
      // grab day 1, 3pm temp
      var dayOneTemp = response.list[4].main.temp;
      // create var for temp
      var dayOneKelvin = dayOneTemp;
      // // convert kelvin to celsius
      var dayOneCelsius = Math.floor(dayOneKelvin - 273);
      // convert celsius to farenheit
      var dayOneFahrenheit = Math.floor(dayOneCelsius * (9/5) + 32);
      // var for humidity
      var dayOneHumidity = response.list[4].main.humidity;
      // var for wind speed
      var dayOneWindSpeed = response.list[4].wind.speed;

      var dayOneIconCode = response.list[4].weather[0].icon;
      // var build icon url
      var dayOneIconURL = "http://openweathermap.org/img/w/" + dayOneIconCode + ".png";

      // clear day one forecast
      $("#day-one-date").empty();
      $("#day-one-title").empty();
      $("#day-one-temp").empty();
      $("#day-one-hum").empty();
      $("#day-one-wind").empty();

      // append day one forecast
      $("#day-one-date").append(currentDayOneDate);
      $('#day-one-wicon').attr('src', dayOneIconURL);
      $("#day-one-title").append(dayOneCityName);
      $("#day-one-temp").append("Temp: " + JSON.stringify(dayOneFahrenheit)+ "°F")
      $("#day-one-temp").append(" ( " +JSON.stringify(dayOneCelsius)+ "°C)");
      $("#day-one-hum").append("Hum: " + JSON.stringify(dayOneHumidity)+ "%");
      $("#day-one-wind").append("Wind Sp: " + JSON.stringify(dayOneWindSpeed)+ "MPH");

      // Day 2
      // grab date
      var dayTwoUnixTime = (response.list[11].dt);
      console.log(dayTwoUnixTime);
      const dayTwoDate = new Date(dayTwoUnixTime*1000);
      var currentDayTwoDate = (dayTwoDate.toLocaleDateString("en-US"));

      var dayTwoCityName = response.city.name;
      var dayTwoTemp = response.list[11].main.temp;
      var dayTwoKelvin = dayTwoTemp;
      var dayTwoCelsius = Math.floor(dayTwoKelvin - 273);
      var dayTwoFahrenheit = Math.floor(dayTwoCelsius * (9/5) + 32);
      var dayTwoHumidity = response.list[11].main.humidity;
      var dayTwoWindSpeed = response.list[11].wind.speed;

      var dayTwoIconCode = response.list[11].weather[0].icon;
      var dayTwoIconURL = "http://openweathermap.org/img/w/" + dayTwoIconCode + ".png";
      
      // clear day 2
      $("#day-two-date").empty();
      $("#day-two-title").empty();
      $("#day-two-temp").empty();
      $("#day-two-hum").empty();
      $("#day-two-wind").empty();

      // append day 2
      $("#day-two-date").append(currentDayTwoDate);
      $('#day-two-wicon').attr('src', dayTwoIconURL);
      $("#day-two-title").append(dayTwoCityName);
      $("#day-two-temp").append("Temp: " + JSON.stringify(dayTwoFahrenheit)+ "°F")
      $("#day-two-temp").append(" ( " +JSON.stringify(dayTwoCelsius)+ "°C)");
      $("#day-two-hum").append("Hum: " + JSON.stringify(dayTwoHumidity)+ "%");
      $("#day-two-wind").append("Wind Sp: " + JSON.stringify(dayTwoWindSpeed)+ "MPH");

      // Day 3
      // grab date
      var dayThreeUnixTime = (response.list[19].dt);
      console.log(dayThreeUnixTime);
      const dayThreeDate = new Date(dayThreeUnixTime*1000);
      var currentDayThreeDate = (dayThreeDate.toLocaleDateString("en-US"));

      var dayThreeCityName = response.city.name;
      var dayThreeTemp = response.list[19].main.temp;
      var dayThreeKelvin = dayThreeTemp;
      var dayThreeCelsius = Math.floor(dayThreeKelvin - 273);
      var dayThreeFahrenheit = Math.floor(dayThreeCelsius * (9/5) + 32);
      var dayThreeHumidity = response.list[19].main.humidity;
      var dayThreeWindSpeed = response.list[19].wind.speed;

      var dayThreeIconCode = response.list[19].weather[0].icon;
      var dayThreeIconURL = "http://openweathermap.org/img/w/" + dayThreeIconCode + ".png";

      // clear day 3
      $("#day-three-date").empty();
      $("#day-three-title").empty();
      $("#day-three-temp").empty();
      $("#day-three-hum").empty();
      $("#day-three-wind").empty();

      // append day 3
      $("#day-three-date").append(currentDayThreeDate);
      $('#day-three-wicon').attr('src', dayThreeIconURL);
      $("#day-three-title").append(dayThreeCityName);
      $("#day-three-temp").append("Temp: " + JSON.stringify(dayThreeFahrenheit)+ "°F")
      $("#day-three-temp").append(" ( " +JSON.stringify(dayThreeCelsius)+ "°C)");
      $("#day-three-hum").append("Hum: " + JSON.stringify(dayThreeHumidity)+ "%");
      $("#day-three-wind").append("Wind Sp: " + JSON.stringify(dayThreeWindSpeed)+ "MPH");

      // Day 4
      // // grab date
      var dayFourUnixTime = (response.list[27].dt);
      console.log(dayFourUnixTime);
      const dayFourDate = new Date(dayFourUnixTime*1000);
      var currentDayFourDate = (dayFourDate.toLocaleDateString("en-US"));

      var dayFourCityName = response.city.name;
      var dayFourTemp = response.list[27].main.temp;
      var dayFourKelvin = dayFourTemp;
      var dayFourCelsius = Math.floor(dayFourKelvin - 273);
      var dayFourFahrenheit = Math.floor(dayFourCelsius * (9/5) + 32);
      var dayFourHumidity = response.list[27].main.humidity;
      var dayFourWindSpeed = response.list[27].wind.speed;

      var dayFourIconCode = response.list[27].weather[0].icon;
      var dayFourIconURL = "http://openweathermap.org/img/w/" + dayFourIconCode + ".png";
      // clear day 4
      $("#day-four-date").empty();
      $("#day-four-title").empty();
      $("#day-four-temp").empty();
      $("#day-four-hum").empty();
      $("#day-four-wind").empty();

      // append day 4
      $("#day-four-date").append(currentDayFourDate);
      $('#day-four-wicon').attr('src', dayFourIconURL);
      $("#day-four-title").append(dayFourCityName);
      $("#day-four-temp").append("Temp: " + JSON.stringify(dayFourFahrenheit)+ "°F")
      $("#day-four-temp").append(" ( " +JSON.stringify(dayFourCelsius)+ "°C)");
      $("#day-four-hum").append("Hum: " + JSON.stringify(dayFourHumidity)+ "%");
      $("#day-four-wind").append("Wind Sp: " + JSON.stringify(dayFourWindSpeed)+ "MPH");

       // Day 5
       // // grab date
      var dayFiveUnixTime = (response.list[34].dt);
      console.log(dayFiveUnixTime);
      const dayFiveDate = new Date(dayFiveUnixTime*1000);
      var currentDayFiveDate = (dayFiveDate.toLocaleDateString("en-US"));

      var dayFiveCityName = response.city.name;
      var dayFiveTemp = response.list[34].main.temp;
      var dayFiveKelvin = dayFiveTemp;
      var dayFiveCelsius = Math.floor(dayFiveKelvin - 273);
      var dayFiveFahrenheit = Math.floor(dayFiveCelsius * (9/5) + 32);
      var dayFiveHumidity = response.list[34].main.humidity;
      var dayFiveWindSpeed = response.list[34].wind.speed;
 
      var dayFiveIconCode = response.list[34].weather[0].icon;
      var dayFiveIconURL = "http://openweathermap.org/img/w/" + dayFiveIconCode + ".png";
       
      //  clear day 5
      $("#day-five-date").empty();
      $("#day-five-title").empty();
      $("#day-five-temp").empty();
      $("#day-five-hum").empty();
      $("#day-five-wind").empty();

      // append day 5
      $("#day-five-date").append(currentDayFiveDate);
      $('#day-five-wicon').attr('src', dayFiveIconURL);
      $("#day-five-title").append(dayFiveCityName);
      $("#day-five-temp").append("Temp: " + JSON.stringify(dayFiveFahrenheit)+ "°F")
      $("#day-five-temp").append(" ( " +JSON.stringify(dayFiveCelsius)+ "°C)");
      $("#day-five-hum").append("Hum: " + JSON.stringify(dayFiveHumidity)+ "%");
      $("#day-five-wind").append("Wind Sp: " + JSON.stringify(dayFiveWindSpeed)+ "MPH");
    });

  });

  
//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);
  

// Sidebar 
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
  

