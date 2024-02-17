// https://api.openweathermap.org/data/2.5/weather?q=london&appid=637a7712c68a18d111c1993dccc1f8f9&units=metric

const apiKey = '637a7712c68a18d111c1993dccc1f8f9';
const apiLink = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBar = document.querySelector('.search input');
const searchBtn = document.querySelector('.btn');
const weatherResImg = document.querySelector('.weather-result-img');

async function changeWeather(city) {
    const response = await fetch(apiLink + city + `&appid=${apiKey}`);


    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }
    else {
        const data = await response.json();
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humid').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind-speed').innerHTML = data.wind.speed + " km/h";


        if (data.weather[0].main == 'Clouds') {
            weatherResImg.src = './asset/Images/clouds.png';
        }
        else if (data.weather[0].main == 'Clear') {
            weatherResImg.src = './asset/Images/clear.png';
        }
        else if (data.weather[0].main == 'Rain') {
            weatherResImg.src = './asset/Images/rain.png';
        }
        else if (data.weather[0].main == 'Drizzle') {
            weatherResImg.src = './asset/Images/drizzle.png';
        }
        else if (data.weather[0].main == 'Snow') {
            weatherResImg.src = './asset/Images/snow.png';
        }
        else if (data.weather[0].main == 'Mist') {
            weatherResImg.src = './asset/Images/mist.png';
        }

        searchBar.value = '';
        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
        // console.log(data);
    }
}



searchBtn.addEventListener('click', () => {
    changeWeather(searchBar.value);
})


function keyPress(event) {
    if (event.key === 'Enter') {
        changeWeather(searchBar.value);
    }
}