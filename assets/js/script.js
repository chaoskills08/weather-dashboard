fetch("https://api.openweathermap.org/data/2.5/onecall?lat=40.08&lon=-82.86&exclude={part}&appid=c3924722c03c1207da00ee288c3bfd63", {
  method: 'GET'
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })