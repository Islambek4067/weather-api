const date = document.querySelector('.data')
const country = document.querySelector('.country')
const rightWeather = document.querySelector('.right-weather')
const temperatureBg = document.querySelector('.temperature-bg')
const rightWeek = document.querySelector('.right-week')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const precipitation = document.querySelector('.precipitation')
const getData = async () =>{
  const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,showers,wind_speed_10m,relative_humidity_2m,precipitation&models=icon_seamless&current=rain,showers,snowfall,precipitation&timezone=auto&wind_speed_unit=mph&precipitation_unit=inch')
  const data = await response.json()
  wind.innerText = `${data.hourly.wind_speed_10m[0]} mph` 
  humidity.innerText = `${data.hourly.relative_humidity_2m[0]} %`
  precipitation.innerText = `${data.hourly.precipitation[0]} inch`
  

  const currentDate = new Date();
  console.log(data);

const iso = currentDate.toISOString().slice(0, 13) + ":00";

const weatherTime = data.hourly.time.find(t => t === iso);

const weatherDate = new Date(weatherTime);

const formatted = weatherDate.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric"
});
  date.insertAdjacentHTML('beforeend', `
    <p>${formatted}</p>
    `)
    country.innerHTML = data.timezone.split('/').join(', ')
  temperatureBg.insertAdjacentHTML('beforeend',  `
    <span class="text-5xl font-bold text-white">${data.hourly.temperature_2m[0] + data.hourly_units.temperature_2m}</span>
    `)

    
    for(let i = 3; i<11; i++){
      rightWeather.innerHTML += `
       <div class="flex items-center justify-between bg-neutral-400 px-3 rounded-lg ">
          <div class="flex gap-3 items-center">
            <img width="40px" src="assets/images/icon-partly-cloudy.webp" alt="">
            ${i} PM
          </div>
          <span>${data.hourly.temperature_2m[i] + data.hourly_units.temperature_2m}</span>
        </div>
      `
    }
}
getData()

const newDate = new Date().toLocaleDateString('en-US',{
  weekday: 'short'
})
rightWeek.innerHTML = newDate