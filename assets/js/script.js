// var rainTest = document.querySelector('#testPull');
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=40.08&lon=-82.86&exclude={part}&appid=c3924722c03c1207da00ee288c3bfd63";
var cityBtn = document.querySelector(".btn");
var cityInput = document.querySelector('.form-input');

// fetch(apiUrl, {
//   method: 'GET'
// })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data)
//     // rainTest.textContent = data.daily[0].rain
//   })

function getLatLon() {
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput.value + '&limit=5&appid=c3924722c03c1207da00ee288c3bfd63')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      getWeather(data[0].lat, data[0].lon)
    })
}

function getWeather(lat, lon) {
  fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + '&lon=' + lon + "&appid=c3924722c03c1207da00ee288c3bfd63")

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      // Create main and sub-cards
    })
}

cityBtn.addEventListener('click', getLatLon)