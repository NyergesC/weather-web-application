
async function loadEvent () {
    console.log("load");
    const rootElement = document.getElementById("root")   
    
    let cities = []
    /* 
    await fetch("./city.list.json").then(
        function (cityResponse) {
            cityResponse.json().then(
                function (cityResponseJson) {
                    for (const city of cityResponseJson) {
                        cities.push(city.name);
                    } 
                }
                )
            }
            )
             */
            
    const valami = await fetch("./city.list.json")
    const valami2 = await valami.json()
    for (const city of valami2) {
        cities.push(city.name);
    } 
    console.log(cities);
            
    
    
    //fetch API 
    const weatherApiKey = "52d43dd250894a8aaef131520220703" 
    let selectedCity = `Budapest`
    const currentWeather = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${selectedCity}`)
    
    
    
    //addeventlistenerrel onchange event az input mezőre 
    //search functionbe fetchelünk
    
    
    
    
    
    const currentWeatherJson = await currentWeather.json()
    console.log(currentWeatherJson);   
    
    const contentHTML = () => {
        return`
        <div class="title">
            <h1>Hot Potatoes' Wheather App</h1>
        </div>
            <div class="input">
                <form autocomplete="off" action="/action_page.php">
                    <div class="autocomplete" style="width:300px;">
                        <input id="myInput" type="text" name="myCountry" placeholder="Country">
                    </div>
                    <input type="submit">
                </form>
        </div>
        <datalist id="mycity">
            <option id="cityOption" value="">
        </datalist> 
        <div class="divcard">
            <img src="pin.png">
            <h3>${currentWeatherJson.location.country}</h3>
            <h1>${currentWeatherJson.location.name}</h1>
            <img class="wheatherImage" src="${currentWeatherJson.current.condition.icon}">
            <h4>${currentWeatherJson.current.condition.text}</h4>
            <h2 class="temp">${currentWeatherJson.current.temp_c}°C</h2>
            <h5>Local time:</h5>
            <h5> ${currentWeatherJson.location.localtime}</h5>
        </div>
        <div class="humidity">
            <img src="humidity.png">
            <h4>Humidity:</h4>
            <h2>${currentWeatherJson.current.humidity}%</h2>
        </div>
        <div class="feelslike">
            <img src="good-review.png">
            <h3>Feels like:</h3>
            <h2>${currentWeatherJson.current.feelslike_c}</h2>
        </div>
        <div class="wind">
            <img src="wind.png" width: "100px">
            <h3>Wind:</h3>
            <h2>${currentWeatherJson.current.wind_kph} km/h</h2>
        </div>        
        `
    }
    rootElement.insertAdjacentHTML("beforeend", contentHTML()) 
    
    
    const inputSearch = document.getElementById("city")
    
    
    inputSearch.addEventListener("input", function(e){
        selectedCity = e.target.value 
        
        
        console.log(selectedCity);
    })
    
    
    

}
window.addEventListener("load", loadEvent);


