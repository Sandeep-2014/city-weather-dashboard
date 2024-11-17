
const cityForm = document.getElementById("form");
const cityInput = document.getElementById("cityInput");

const currentDiv = document.createElement('div')
currentDiv.id = 'currentDiv'
const forcastDiv = document.createElement('div')
forcastDiv.id = 'forcastDiv'

let body = document.querySelector('body')
const apiKey = '98cbb1228ee7fe94df78c47e61d4e64f';

cityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let cityname = cityInput.value.trim()
    console.log(cityname);
    // console.log(currentDiv);
    currentDiv.innerHTML = ''
    forcastDiv.innerHTML = ''

    fethWeatherData(cityname)
});


async function fethWeatherData(cityName) {
    try {
        let [currentWeather, weatherForcast] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&appid=${apiKey}&units=metric`).then(res => res.json()),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName},IN&appid=${apiKey}&units=metric`).then(res => res.json())
        ])
        const date = new Date().toLocaleDateString();
        console.log(currentWeather);

        console.log(weatherForcast);
        displayCurrentWeather(currentWeather)
        displayWeatherForcast(weatherForcast)

    } catch (err) {
        // showError(err)
        console.error(err)
    }

}

function displayCurrentWeather(currentWeatherData) {
    // currentDiv.innerHTML = 'hi I am sandeep'
    let date = new Date().toLocaleDateString()
    let temprature = currentWeatherData.main.temp
    let humidity = currentWeatherData.main.humidity
    let windSpeed = (currentWeatherData.wind.speed) * 3.6
    let description = currentWeatherData.weather[0].description
    let iconCode = currentWeatherData.weather[0].icon
    let nameOfCity = currentWeatherData.name
    // console.log(nameOfCity
    // console.log('city name is:- ', nameOfCity);
    // console.log('date is:- ', date);
    // console.log('temprature is:- ', temprature);
    // console.log('humidity is:- ', humidity);
    // console.log('wind Speed is :- ', windSpeed);
    // console.log('description is:- ', description);

    currentDiv.innerHTML = ''
    currentDiv.innerHTML = `<h1>City Name:- ${nameOfCity}</h1> <h3>Date:- ${date}</h3> <img src='https://openweathermap.org/img/w/${iconCode}.png'> <p> Temprature:- ${temprature}°C </p> <p> Description:- ${description} </p> <p>Humidity percentage:- ${humidity}</p> <p>Wind speed:- ${windSpeed} km/h</p>`

    body.appendChild(currentDiv)

}


function displayWeatherForcast(forecastData) {
    filterForcastData = forecastData.list.filter((data, index) => index % 8 === 0)
    filterForcastData.shift()
    console.log(filterForcastData);


    forcastDiv.innerHTML = ''
    filterForcastData.forEach((element) => {
        const contentDiv = document.createElement('div')
        contentDiv.classList = 'contentDiv'

        let temprature = element.main.temp
        // element.text was giving as output like this:- "2024-11-14 03:00:00" in this time was also comming but i don't want time in this so as we can see in this output between date and time there was space so first I have conveted it into array and through the help of date index I splice the date.
        let date = element.dt_txt.split(' ')[0]
        let iconCode = element.weather[0].icon
        let description = element.weather[0].description

        contentDiv.innerHTML = `<h2>Forcast weather</h2> <h3>Date:- ${date}</h3> <img src='https://openweathermap.org/img/w/${iconCode}.png'> <p>Expected Temprature:- ${temprature}°C </p> <p> Description:- ${description} </p>`

        forcastDiv.appendChild(contentDiv)
    })

    body.appendChild(forcastDiv)

}




function showError(message) {
    let errorDiv = document.createElement('div')
    errorDiv.innerHTML = `<p>${message}</p>`
    // errorDisplay.innerHTML = `<p>${message}</p>`;
    // weatherDisplay.innerHTML = "";
    // forecastDisplay.innerHTML = "";
}
