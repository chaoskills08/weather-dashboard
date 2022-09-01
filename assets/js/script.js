// var rainTest = document.querySelector('#testPull');
var cityBtn = document.querySelector(".btn");
var cityInput = document.querySelector('.form-input');
var cityName = document.querySelector('#cityName');
var today = document.getElementById('today');
var boxInput = document.querySelector('#city');
var fiveDayDiv = document.querySelector('#fiveDay');
var lastCity = document.getElementById("lastCity")

if (localStorage.getItem('city')) {
  var cities = localStorage.getItem('city')
  var savedCities = cities.split(',')
} else {
  var savedCities = [];
}

function getLatLon(boxInput, element) {
  let param = boxInput || element;
  localStorage.setItem('city', boxInput)
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&limit=3&appid=c3924722c03c1207da00ee288c3bfd63')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      getWeather(data[0].lat, data[0].lon), param;
      getFiveDay(data[0].lat, data[0].lon)
      // cityCreate.textContent = data[0].name;
      // cityName.append(cityCreate);
    })
}

function getWeather(lat, lon, param) {
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + '&lon=' + lon + "&units=imperial&appid=c3924722c03c1207da00ee288c3bfd63")

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var unixTimestamp = data.current.dt;
      var dateT = new Date(unixTimestamp * 1000)
      printToday(data, dateT, param);
    })
}

function getFiveDay(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={minutely,hourly,alerts,current}&appid=c3924722c03c1207da00ee288c3bfd63`)
      .then(function (response) {
          return response.json()
      })
      .then(function (data) {
          var fiveData = data.daily.slice(0, 5)
          displayFive(fiveData)
      })
}

function displayFive(fiveData) {
  fiveDayDiv.innerHTML = ''
  
  for (var i = 0; i < 5; i++) {
      
      let fiveDayContainer = document.createElement("div")
      var icon = document.createElement("img")
      var itemTemp = document.createElement("p")
      var itemHum = document.createElement("p")
      var itemWind = document.createElement("p")
      var itemDate = document.createElement("h5")
      
      let dateFive = fiveData[i].dt
      let newDateFive = new Date(dateFive * 1000);
      const fiveDate = newDateFive.toLocaleDateString("en-US")
      
      itemDate.textContent = fiveDate
      itemWind.textContent = fiveData[i].wind_speed + " mph";
      itemHum.textContent = "Humidity: " + fiveData[i].humidity + "%";
      itemTemp.textContent = fiveData[i].temp.day + "°F";
      icon.src = `https://openweathermap.org/img/w/${fiveData[i].weather[0].icon}.png`
      
      fiveDayContainer.append(itemDate, icon, itemTemp, itemHum, itemWind)
      
      fiveDayContainer.className = `col bg-primary text-white ml-3 mb-3 rounded forecast shadow`;
      fiveDayContainer.setAttribute("style", "width: 150px;", "height: 100px;")
      
      fiveDayDiv.append(fiveDayContainer)        
  };
}

function printToday(data, dateT) {

  getWeather.innerHTML= ''
  var todayContainer = document.createElement('div');
  var date = document.createElement("h4")
  var city = document.createElement('h2');
  var icon = document.createElement('img');
  var temp = document.createElement('li');
  var humidity = document.createElement('li');
  var wind = document.createElement('li');
  var uv = document.createElement('li');
  var fieldInput = boxInput.value;

  today.innerHTML= '';
  city.innerHTML = fieldInput;
  // Don't forget this //
  temp.innerHTML = "Temperature: " + data.current.temp + "°F";
  date.innerHTML = " " + dateT.toLocaleDateString("en-US");
  wind.innerHTML = "Wind speed: " + data.daily[0].wind_speed + " MPH";
  humidity.innerHTML = 'Humidity: ' + data.daily[0].humidity + '%';
  uv.innerHTML = "UV index: " + data.daily[0].uvi;
  icon.src = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
  
  today.appendChild(city);
  today.appendChild(icon);
  today.appendChild(temp);
  today.appendChild(wind);
  today.appendChild(humidity);
  today.appendChild(uv);

  todayContainer.append(date, city, icon, temp, humidity, wind, uv);

  today.append(todayContainer)

  if (uv.textContent <= 2) {
    uv.classList.add("bg-success")
  } else if (uv.textContent > 2 && uv.textContent <= 5) {
    uv.classList.add("bg-warning")
  } else if (uv.textContent > 5) {
    uv.classList.add("bg-danger")
  } 
}

function cityButtons() {
  var cityString = localStorage.getItem("city")
  var cityArray = cityString.split(",")
  cityArray.forEach(element => {
      const cityBtn = document.createElement("button")
      cityBtn.textContent = element
      lastCity.append(cityBtn)
      cityBtn.addEventListener("click", function (event){
          getLatLon(element)
      })
  })};

cityBtn.addEventListener('click', getLatLon)

cityBtn.addEventListener('click', function (event) {
  event.preventDefault();

  var cityChoice = document.querySelector('#city').value;
  if (cityChoice === '')
  return;
  else {
    getLatLon(cityChoice)
    savedCities.push(cityChoice);
    localStorage.setItem('city', savedCities)
  }
})

cityButtons()



