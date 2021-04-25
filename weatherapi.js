var apiKey = "10a1076b512db0c4120be9af80a7ee5a";
var myLocation = "";





var weatherAtm = (event) => {
    
    let city = $('#search-city').val();
    myLocation= $('#search-city').val();
    // imperial is used to get farenheit instead of Celsius
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + apiKey;
    // GET request to receive json from the openWeather API.
    fetch(queryURL)
    .then((response) => {
        if (response.ok) {
        return response.json();
      } else {
          throw new Error('Something went wrong');
      }
    })
    .then((response) => {
      
        let weatherJson = response;
        icon = weatherJson.weather[0].icon
        
    
        // Display aspects of the weather in HTML
        let addWeather = `
            
            <h3>Currently in ${response.name} <img src="http://openweathermap.org/img/w/${icon}.png">  </h3>
            <ul class="list-unstyled">
                <li>Temperature: ${response.main.temp}&#8457;</li>
                <li>Humidity: ${response.main.humidity}%</li>
                <li>Wind Speed: ${response.wind.speed} mph</li>
            </ul>`;
        
        $('#current-weather').html(addWeather);
       
        openWeatherForecast(event);
    })
}


var openWeatherForecast = (event) => {
    let city = $('#search-city').val();
 
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial"  + "&APPID=" + apiKey;
  
    fetch(queryURL)
        .then((response) => {
            if (response.ok) {
            return response.json();
           }else {
            throw new Error('Something went wrong');   
           }
        })
        .then((response) => {
    
        let weatherList = `
        <h2>5-Day Forecast:</h2>
        <div id="forecast" class="d-inline-flex flex-wrap ">`;

      //iterating through every 8th result in json response to display 5 days.        
        for (let i = 0; i < response.list.length; i+=8) {
            let weatherJson = response.list[i];
            icon = weatherJson.weather[0].icon



            
                weatherList += `
                <div class="weather-card ">
                    <ul class="list-unstyled p-3">
                        <li> Date: ${weatherJson.dt_txt}</li>
                        <br>
                        <li>Temp: ${weatherJson.main.temp}&#8457;</li>
                        <br>
                        <li>Humidity: ${weatherJson.main.humidity}%</li>
                        <br>
                        <img src="http://openweathermap.org/img/w/${icon}.png"> 
                    </ul>
                </div>`;
                
            
        }
        
    
        $('#five-day-forecast').html(weatherList);
    })
}




// New city search button event listener
$('#search-button').on("click", (event) => {
event.preventDefault();
myLocation = $('#search-city').val();
weatherAtm(event);
});



//call weatherAtm function
weatherAtm();
