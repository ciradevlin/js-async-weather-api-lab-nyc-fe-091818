const API_KEY = "603cad15e6bfc2ee4c53e5a5f6465736"

function handleFormSubmit(event) {
  //handle submit event
  const input = document.querySelector('#city')
  const city = input.value
  fetchCurrentWeather(city)
  fetchFiveDayForecast(city)
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + API_KEY + '&units=imperial')
  .then((response) => response.json())
  .then((responseJson) => {
  displayCurrentWeather(responseJson)
  createChart(responseJson)
  })
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  
console.log(json)

const temperatureCell = document.querySelector('#temp')
const low = document.querySelector('#low')
const high = document.querySelector('#high')
const humidity = document.querySelector('#humidity')
const cloudCover = document.querySelector('#cloudCover')

temperatureCell.innerText = json.main.temp +'°F'
low.innerText = json.main.temp_min + '°F'
high.innerText = json.main.temp_max + '°F'
humidity.innerText = json.main.humidity + '%'
cloudCover.innerText = json.clouds.all + '%'

}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  
  fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + API_KEY + '&units=imperial')
  .then((response) => response.json())
  .then((responseJson) => displayFiveDayForecast(responseJson))
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  console.log(json)
  for (let i = 0; i < 39; i++) {
  
 const firstForcast = json.list[i]
 const div = document.createElement('div')
 div.innerHTML = '<p>' + firstForcast.dt_txt + '</p>' +
                 '<p>' + firstForcast.main.temp_min + '</p>' +
                 '<p>' + firstForcast.main.temp_max + '</p>'
 
 const aside = document.querySelector('aside')
 aside.appendChild(div)
  
}

}

function getDataText(forecast) { 
  return forecast.dt_txt

}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS

  const ctx = document.getElementById("weatherChart").getContext('2d');
  
  const forecast = json.list
  const chartLabels = forecasts.map(getDataText)
  
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

  
}



document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('submit', function(event) {
    handleFormSubmit(event)
  event.preventDefault()
  handleFormSubmit(event)
  
})
  
})
