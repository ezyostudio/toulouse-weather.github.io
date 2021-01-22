

const lat = 43.6043056
const long = 1.4446944444444445


var app = new Vue({
  el: '#app',
  data: {
    isMobile: false,
    isDesktop: false,
    city: "...",
    time: "--:--",
    currentTemp: "-°",
    humidity: "--",
    wind: "--",
    minTemp: "-",
    feelsTemp: "-",
    maxTemp: "-",
    description: "Description",
    forecast: []
  },
  mounted: function () {
    this.getData()
    let self = this;
    window.onresize = () => {
      console.log('resize event');
      this.resize(self);
    };

    this.resize(self);
  },
  methods: {
    getData: function () {
      key = "2672da1c527db251b61ae4f3986325de"


      const current = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`
      const forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&units=metric&appid=${key}`
      fetch(current)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data)

          //Get cityname
          this.city = data.name
          //document.querySelector('.city').innerText = city


          //Get current temp & weather icon
          const current_temp = Math.round(data.main.temp)
          const current_icon = data.weather[0].icon

          console.log(current_icon)

          this.currentTemp = current_temp + "°"

          svgLink = `./weather-vector-icons/${current_icon}.svg`
          document.querySelector('.current-icon').src = svgLink
          document.querySelector('.desktop-icon').src = svgLink

          this.background(current_icon)

          //Desktop only infos
          this.humidity = data.main.humidity
          this.wind = data.wind.speed
          this.minTemp = Math.round(data.main.temp_min)
          this.maxTemp = Math.round(data.main.temp_max)
          this.feelsTemp = Math.round(data.main.feels_like)

          this.description = this.traduction(data.weather[0].description)

        })


      fetch(forecast)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data)

          this.forecast = data.daily.map((day) => {
            const date = new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
              weekday: "short",
              day: "2-digit"
            }).replaceAll('.', '');

            return {
              date: date,
              icon: day.weather[0].icon,
              temp: Math.round(day.temp.day),
              minTemp: Math.round(day.temp.min),
              maxTemp: Math.round(day.temp.max),
              description: this.traduction(day.weather[0].description)
            }
          })

          //Get Time
          const dt = data.current.dt
          var date = new Date(dt * 1000)
          var hours = date.getHours()
          var minute = date.getMinutes()
          if (minute < 10) {
            minute = String("0" + minute)
          }
          timenow = hours + ":" + minute
          this.time = timenow

          //Get icon for each forecast days

          console.log(data.daily)

          for (let index = 1; index < 5; index++) {
            const dailyTemp = Math.round(data.daily[index].temp.day)

            const dailyIcon = data.daily[index].weather[0].icon
            svgLink = `./weather-vector-icons/${dailyIcon}.svg`

            const date = data.daily[index].dt
            const dateObject = new Date(date * 1000)

            const jour = dateObject.toLocaleDateString("fr-FR", {
              weekday: "long"
            })

            document.querySelector(`.forecast${index} img`).src = svgLink
            document.querySelector(`.date${index} p`).innerHTML = jour[0] + jour[1] + jour[2]
            document.querySelector(`.forecast-temp${index} p`).innerHTML = dailyTemp + "°"
          }

        })
    },
    background: function (id) {
      //Thunder /Rain
      if ((id == "11d") || (id == "09d") || (id == "10d") || (id == "13d") || (id == "50d")) {
        document.body.style.background = "linear-gradient(#243E5D,#393068)"
      }
      //Night
      else if ((id == "01n") || (id == "02n") || (id == "03n") || (id == "04n") || (id == "09n") || (id == "10n") || (id == "11n") || (id == "13n") || (id == "50n")) {
        document.body.style.background = "linear-gradient(#01162E,#001D37)"
      }
      //Sun
      else if (id == "01d") {
        document.body.style.backgroundImage = "linear-gradient(#f4c665,#e38a73)"
      }
      //Slight Cloud
      else if ((id == "02d") || (id == "03d" || (id == "04d"))) {
        document.body.style.background = "linear-gradient(#3b9fc3,#5ba9c6)"
      }
    },
    traduction: function (desc) {
      if (desc == "clear sky") {
        return "Ciel Dégagé"
      } else if (desc == "few clouds") {
        return "Quelques Nuages"
      } else if (desc == "scattered cloud") {
        return "Nuages Dispersés"
      } else if (desc == "broken clouds") {
        return "Nuages Épais"
      } else if (desc == "shower rain") {
        return "Fortes Pluies"
      } else if (desc == "rain") {
        return "Pluie"
      } else if (desc == "thunderstorm") {
        return "Orage"
      } else if (desc == "snow") {
        return "Neige"
      } else if (desc == "mist") {
        return "Brouillard"
      } else if (desc == "light rain") {
        return "Faible Pluie"
      } else if (desc == "moderate rain") {
        return "Pluie"
      } else if (desc == "overcast clouds") {
        return "Ciel Couvert"
      } else if (desc == "heavy intensity rain") {
        return "Forte Pluie"
      } else {
        return desc
      }
    },
    resize: (self)=>{
      if (screen.width < 1012) {
        self.isMobile = true
        self.isDesktop = false
      } else {
        self.isMobile = false
        self.isDesktop = true
      }
    }
  }
})