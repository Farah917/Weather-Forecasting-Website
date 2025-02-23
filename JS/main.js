const countryEntered=document.getElementById('countryEntered')
const searchButton=document.getElementById('searchButton')
const DayoftheWeek=document.getElementById('DayoftheWeek')
const DayoftheMonth=document.getElementById('DayoftheMonth')
const govName=document.getElementById('govName')
const tempC=document.getElementById('tempC')
const tempCondition=document.getElementById('tempCondition')
const weatherIcon=document.getElementById('weatherIcon')
const humidity=document.getElementById('humidity')
const wind=document.getElementById('wind')
const winDir=document.getElementById('winDir')
const tomorrowDay=document.getElementById('tomorrowDay')
const afterTomorrowDay=document.getElementById('afterTomorrowDay')
const weatherIcon2=document.getElementById('weatherIcon2')
const weatherIcon3=document.getElementById('weatherIcon3')
const expMaxWeather=document.getElementById('expMaxWeather')
const expMinWeather=document.getElementById('expMinWeather')
const tempu=document.getElementById('tempu')
const expMaxWeather2=document.getElementById('expMaxWeather2')
const expMinWeather2=document.getElementById('expMinWeather2')
const tempu2=document.getElementById('tempu2')

// Geolocation
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
        const lat=pos.coords.latitude;
        const long=pos.coords.longitude;
        console.log(lat)
        console.log(long)
        getWeather(`${lat},${long}`)
    })
}else{
    alert('Geolocation is not allowed in your PC')
}

// Get Data
async function getWeather(query) {
    var fetching = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=a4106b54024c495087f192210250302`);
    var data = await fetching.json()
    console.log(data)
    displayTodaysWeather(data)
    displayTomorrowsWeather(data)
    displayAfterTomorrowsWeather(data)
}

// Search Input and Button
countryEntered.addEventListener('input',function(e){
    getWeather(e.target.value)
})

searchButton.addEventListener('click',function(){
    if(countryEntered.value===""){
        window.alert("PLease Enter a Country")
    }
    else{
        getWeather(countryEntered.value)
    }
})

// Displaying Current Day's Weather
function displayTodaysWeather(data){
    const TodaysDate= new Date(data.current.last_updated)
    let date = new Date (TodaysDate)
    const today=date.toLocaleString('en-us',{weekday:'long'})
    const todaynum=date.getDate()
    const month=date.toLocaleString('en-us',{month:'long'})
    const cityName=data.location.name
    const temp=data.current.temp_c
    const conditions= data.current.condition.text
    const tempHumidity=data.current.humidity
    const windperhr=data.current.wind_kph
    const winddirectionr=data.current.wind_dir
    const iconURL = "https:" + data.current.condition.icon;

    DayoftheWeek.innerHTML=today
    DayoftheMonth.innerHTML=`${todaynum} ${month}`
    govName.innerHTML=cityName
    tempC.innerHTML=temp + " °C"
    tempCondition.innerHTML=conditions
    humidity.innerHTML=tempHumidity + " %"
    wind.innerHTML=windperhr + " km/h"
    winDir.innerHTML=winddirectionr 
    weatherIcon.setAttribute('src', iconURL);
}

// Displaying Tomorrow's Weather
function displayTomorrowsWeather({forecast}){
    console.log(forecast)
    const nextDay=new Date(forecast.forecastday[1].date).toLocaleString('en-us',{weekday:'long'})
    const iconURL2= "https:" + forecast.forecastday[1].day.condition.icon
    const tommaxWeather=forecast.forecastday[1].day.maxtemp_c
    const tomminWeather=forecast.forecastday[1].day.mintemp_c
    const TomForecast=forecast.forecastday[1].day.condition.text

    tomorrowDay.innerHTML= nextDay
    weatherIcon2.setAttribute('src', iconURL2)
    expMaxWeather.innerHTML=tommaxWeather + " °C"
    expMinWeather.innerHTML=tomminWeather + " °C"
    tempu.innerHTML=TomForecast
}

// Displaying After Tomorrow's Weather
function displayAfterTomorrowsWeather({forecast}){
    const afterTomDay=new Date(forecast.forecastday[2].date).toLocaleString('en-us',{weekday:'long'})
    const iconURL3= "https:" + forecast.forecastday[2].day.condition.icon
    const tommaxWeather2=forecast.forecastday[2].day.maxtemp_c
    const tomminWeather2=forecast.forecastday[2].day.mintemp_c
    const TomForecast2=forecast.forecastday[2].day.condition.text

    afterTomorrowDay.innerHTML=afterTomDay
    weatherIcon3.setAttribute('src', iconURL3)
    expMaxWeather2.innerHTML=tommaxWeather2 + " °C"
    expMinWeather2.innerHTML=tomminWeather2 + " °C"
    tempu2.innerHTML=TomForecast2
}