var button = document.querySelector ('.submit-button');
var inputValue = document.querySelector ('.input-value');
var city = document.querySelector ('.city-name');
var temp = document.querySelector ('.temperature');
var details = document.querySelector ('.weather-details');
var humidity = document.querySelector ('.humidity');
var windSpeed = document.querySelector ('.wind-speed');
var uvIndex = document.querySelector ('.uv-index');


getSavedCities ()

button.addEventListener("click", function(){
    fetch ('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&units=imperial&appid=0e51bac5723eec7ad3c1c5d635a652c1')
    .then(response => response.json())
    // .then (data => console.log(data))
    .then(data=> {
        //store current weather
        var weatherCity = data['city']['name'];
        var weatherTemp = data ['list'][0]['main']['temp'];
        var weatherDescr = data ['list'][0]['weather'][0]['main'];
        
        localStorage.setItem ('savedCities', weatherCity);


        //add current weather to page
        console.log (weatherCity + weatherTemp + weatherDescr );
        $(".current-header").append("<h2>" + "Current Weather:" + "</h2>" );
        city.innerHTML = weatherCity;
        temp.innerHTML=weatherTemp + " degrees";
        details.innerHTML = weatherDescr;
        // humidity.innerHTML = weatherHumidity;
        // windSpeed.innerHTML = weatherWindSpeed;
        // uvIndex.innerHTML = weatherUv;

        //assign icons
        if (weatherDescr == "Clouds") {
            $(".today-image").append("<img src='http://openweathermap.org/img/wn/03d@2x.png'>")
        }
        else if (weatherDescr == "Rain") {
            $(".today-image").append("<img src='http://openweathermap.org/img/wn/10d.png@2x.png'>")
        }
        else if (weatherDescr == "Clear") {
            $(".today-image").append("<img src='http://openweathermap.org/img/wn/01d.png@2x.png'>")
        }
        else if (weatherDescr == "Thunderstorm") {
            $(".today-image").append("<img src='http://openweathermap.org/img/wn/11d.png@2x.png'>")
        }
        else if (weatherDescr == "Snow") {
            $(".today-image").append("<img src='http://openweathermap.org/img/wn/13d.png@2x.png'>")
        }
        else {
        $(".today-image").append("<img src='http://openweathermap.org/img/wn/02d.png@2x.png'>")}

        //store future A
        var weatherTempA = data ['list'][1]['main']['temp'] + " degrees";
        var weatherDescrA = data ['list'][1]['weather'][0]['main'];
        //store future B
        var weatherTempB = data ['list'][2]['main']['temp'] + " degrees";
        var weatherDescrB = data ['list'][2]['weather'][0]['main'];
        //store future C
        var weatherTempC = data ['list'][3]['main']['temp'] + " degrees";
        var weatherDescrC = data ['list'][3]['weather'][0]['main'];
        
        
        //assign to array
        forecastArrA = [weatherTempA , weatherDescrA]; 
        forecastArrB = [weatherTempB , weatherDescrB]; 
        forecastArrC = [weatherTempC , weatherDescrC]; 

        //call subHeadings function
        createSubheads ();
       //create elements
        forecastArrA.forEach(function(item) {
        $(".forecast-A").append("<p>" + item + "</p>");
        });
        forecastArrB.forEach(function(item) {
       
        $(".forecast-B").append("<p>" + item + "</p>");
        });
        forecastArrC.forEach(function(item) {
            
        $(".forecast-C").append("<p>" + item + "</p>");


        });
        
    })
    .catch(err => alert("Invalid City Entered"))
})

    function createSubheads () {
        $(".forecast-A-heading").append("<h3>" + "In 3 Hours: " + "</h3>" );
        $(".forecast-B-heading").append("<h3>" + "In 6 Hours: " + "</h3>" );
        $(".forecast-C-heading").append("<h3>" + "In 9 Hours: " + "</h3>" );
    }


    function assignIcons() {
        if (weatherDescr == "Clouds") {
            $("#today-image").append("<img src='http://openweathermap.org/img/wn/03d@2x.png'>")
        }
        else if (weatherDescr == "Rain") {
            $("#today-image").append("<img src='http://openweathermap.org/img/wn/10d.png@2x.png'>")
        }
        else if (weatherDescr == "Clear") {
            $("#today-image").append("<img src='http://openweathermap.org/img/wn/01d@2x.png'>")
        }
        else if (weatherDescr == "Thunderstorm") {
            $("#today-image").append("<img src='http://openweathermap.org/img/wn/11d.png@2x.png'>")
        }
        else if (weatherDescr == "Snow") {
            $("#today-image").append("<img src='http://openweathermap.org/img/wn/13d.png@2x.png'>")
        }
        else {
        $("#today-image").append("<img src='http://openweathermap.org/img/wn/02d.png@2x.png'>")}
    }

    function getSavedCities () {
        var savedCities = localStorage.getItem('savedCities');
        console.log(savedCities);
        $(".recent-cities").append("<p>" + savedCities + "</p>")
    }

