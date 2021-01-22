document.addEventListener('DOMContentLoaded', ()=> {

    const lat = 43.6043056
    const long = 1.4446944444444445


    if (screen.width < 1012) {
    }else {
        console.log("Yes")
    }
    
    /* function getData() {
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
                    const city = data.name
                    document.querySelector('.city').innerText=city

                    //Get current temp & weather icon
                    const current_temp = Math.round(data.main.temp)
                    const current_icon= data.weather[0].icon
                    
                    console.log(current_icon)
                    
                    document.querySelector('.current-temp').innerText=current_temp+"°"
                    
                    svgLink=`./weather-vector-icons/${current_icon}.svg`
                    document.querySelector('.current-icon').src=svgLink
                
                    background(current_icon)
                })
            

            fetch(forecast)
                .then(response => {
                    return response.json();
                })    
                .then(data => {
                    console.log(data)

                    //Get Time
                    const dt = data.current.dt
                    var date = new Date(dt*1000)
                    var hours = date.getHours()
                    var minute = date.getMinutes()
                    if (minute < 10) {
                        minute = String("0"+minute)
                    }
                    time=hours+":"+minute
                    document.querySelector('.time').innerText=time

                    //Get icon for each forecast days

                    console.log(data.daily)

                    for (let index = 1; index < 5; index++) {
                        const dailyTemp = Math.round(data.daily[index].temp.day)
                        
                        const dailyIcon = data.daily[index].weather[0].icon
                        svgLink=`./weather-vector-icons/${dailyIcon}.svg`

                        const date = data.daily[index].dt
                        const dateObject = new Date(date*1000)

                        const jour = dateObject.toLocaleDateString("fr-FR", {weekday: "long"}) 
                        console.log(jour[0]+jour[1]+jour[2])

                        document.querySelector(`.forecast${index} img`).src=svgLink
                        document.querySelector(`.date${index} p`).innerHTML=jour[0]+jour[1]+jour[2]
                        document.querySelector(`.forecast-temp${index} p`).innerHTML=dailyTemp+"°"    
                    }
                })
    } */

    // function background(id) {
    //     //Thunder /Rain
    //     if ( (id == "11d") || (id == "09d") || (id == "10d") || (id == "13d") || (id == "50d") ) {
    //         document.body.style.background="linear-gradient(#243E5D,#393068)"
    //     } 
    //     //Night
    //     else if ( (id == "01n") || (id == "02n") || (id == "03n") || (id == "04n") || (id == "09n") || (id == "10n") || (id == "11n") || (id == "13n") || (id == "50n")) {
    //         document.body.style.background="linear-gradient(#01162E,#001D37)"
    //     } 
    //     //Sun
    //     else if (id == "01d") {
    //         document.body.style.backgroundImage="linear-gradient(#f4c665,#e38a73)"
    //     } 
    //     //Slight Cloud
    //     else if ((id == "02d") || (id == "03d" || (id == "04d"))) {
    //         document.body.style.background="linear-gradient(#3b9fc3,#5ba9c6)"
    //     }
    // }
});