const deg = 6
const ElementHr = document.getElementById("hr")
const ElementMn = document.getElementById("mn")
const ElementSc = document.getElementById("sc")

const [ elementHourLeft, elementHourRight] = document.querySelectorAll(".dg-hour")
const [ elementMinLeft, elementMinRight] = document.querySelectorAll(".dg-min")
const [ elementSecLeft, elementSecRight] = document.querySelectorAll(".dg-sec")

function clock() {
    const date = new Date()

    const hour = date.getHours() * 30
    const mn = date.getMinutes() * deg
    const sc = date.getSeconds() * deg


    ElementHr.style.transform = `rotateZ(${(hour) + (mn/12)}deg)`
    ElementMn.style.transform = `rotateZ(${mn}deg)`
    ElementSc.style.transform = `rotateZ(${sc}deg)`

    const [ hourLeft, hourRight ] = String(date.getHours()).padStart(2, '0').split('')
    const [ minLeft, minRight ] = String(date.getMinutes()).padStart(2, '0').split('')
    const [ secLeft, secRight ] = String(date.getSeconds()).padStart(2, '0').split('')

   

    elementHourLeft.innerHTML = hourLeft
    elementHourRight.innerHTML = hourRight
    elementMinLeft.innerHTML = minLeft
    elementMinRight.innerHTML = minRight
    elementSecLeft.innerHTML = secLeft
    elementSecRight.innerHTML = secRight

}

clock()

setInterval( clock, 500)


const Apikey = 'fb9709843d4b5f15c6ffa23d37d77f85'

async function api(url) {
    const response = await fetch(url).then(response => response.json())
    return response
}

async function getcity(city) {
    const data = await api(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&appid=${Apikey}`)
    const result = data  ? {
        description: `${data.name}, ${data.sys.country}`,
        lat: data.coord.lat,
        lon: data.coord.lon,
    } : null;

    console.log(result)
    return result
}


async function getWeather(lat, lon){
    const lang = "pt_br"
    const units = "metric"
    const data = await api(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Apikey}&lang=${lang}&units=${units}`)
    const result = data  ? {
        description:  data.weather[0].description,
        icon: data.weather[0].icon,
        temperature: data.main.temp,
    } : null;

    return result

}

async function weather() {
    
    const valueCity = document.querySelector('input.city').value

    if(!valueCity) {
        return
    }

    const elementWeather = document.querySelector('.weather')
    const weatherIcon = document.getElementById('weatherIcon')
    const elementCity = document.getElementById('city')
    const description = document.getElementById('description')
    const temp = document.getElementById('temp')

    elementWeather.classList.add('active')

    const city = await getcity(valueCity)
    const weather = await getWeather(city.lat, city.lon)

    weatherIcon.attributes.src.value = `http://openweathermap.org/img/w/${weather.icon}.png`

    elementCity.innerText = city.description
    description.innerText = weather.description
    temp.innerText = `${weather.temperature}°`

}

const form = document.getElementById('localization')

form.addEventListener('submit', e => {
    e.preventDefault()

    weather()
})