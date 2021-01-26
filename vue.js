var coords = {
  lat: 43.6043056, 
  long: 1.4446944444444445 
}

console.log(coords)

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
    forecast: [],
    hours: [],
  },
  mounted: function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function success(pos) {
          console.log(pos)  
          coords.lat = pos.coords.latitude
          coords.long = pos.coords.longitude
          app.getData()
      }, function(...arg) {
        app.getData()
      }, {enableHighAccuracy: false})
    }else {
      this.getData()
    }
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

      const current = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=metric&appid=${key}`
      const forecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&exclude=minutely&units=metric&appid=${key}`
      fetch(current)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data)

          //Get cityname
          this.city = data.name

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

            const weekday = new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
              weekday: "short",
            }).replaceAll('.', '');

            return {
              date: date,
              icon: day.weather[0].icon,
              temp: Math.round(day.temp.day),
              minTemp: Math.round(day.temp.min),
              maxTemp: Math.round(day.temp.max),
              description: this.traduction(day.weather[0].description),
              weekday: weekday
            }
          })

          this.hours = data.hourly.map((hour) => {
            const time = new Date(hour.dt * 1000).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })

            return {
              time: time,
              temp: Math.round(hour.temp)
            }
          })

          // Creating the chart
          Chart.defaults.global.legend.display = false;
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [this.hours[1].time, this.hours[2].time, this.hours[3].time, this.hours[4].time, this.hours[5].time],
                datasets: [{
                    data: [this.hours[1].temp, this.hours[2].temp, this.hours[3].temp, this.hours[4].temp, this.hours[5].temp],
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.1)',
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 0.3)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#fff',
                            fontFamily: 'Dosis',
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        ticks: {
                          fontColor: '#fff',
                          fontFamily: 'Dosis',
                        }
                    }]
                },
            }
        });

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

          this.refresh()
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
      } else if (desc == "scattered clouds") {
        return "Nuages Dispersés"
      } else {
        return desc
      }
    },
    refresh: function() {
      document.querySelector('.refresh').addEventListener('click', function() {
        app.getData()
      })
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