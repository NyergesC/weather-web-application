const fetchOpt = {                          
    key: 'key=a21bbc1401c94828958202032220803', 
    url: 'http://api.weatherapi.com/v1',        
    methodes: {
      search: '/search.json',
      forecast: '/forecast.json',
      current: '/current.json'
    },
    query: 'q='     
  };
  
  window.addEventListener('load', onHTMLParsingFinished);
  
  function getFetchUrl(fetchOpt, methode, query) {
    return `${fetchOpt.url}${fetchOpt.methodes[methode]}?${fetchOpt.key}&${fetchOpt.query}${query}` 
  }
  
  
  function onHTMLParsingFinished() { 
  
  
    document.getElementById('root').insertAdjacentHTML('beforeend',
      `
      <div class="title">
        <h1>Hot Potatoes' Wheather App</h1>
      </div>
      <div class="input">
        <form id="form-weather" class="js-form-weather">
          <div class="autocomplete" >
            <input autocomplete=off id="city" list="list-city" name="city" form="form-weather" placeholder="Choose your city">
          </div>    
          <datalist id="list-city"></datalist>
          <button class="js-selected-city" type="button">Search</button>
         
        </form>
      </div>        
      <article id="card">
      
      </article>`);
  
    document.getElementById('city').addEventListener('keyup', async e => { 
      const value = e.target.value;
  
      if (value.length >= 3) { 
          await fetch(getFetchUrl(fetchOpt, 'search', value)) 
          .then(result => { 
            return result.json()
          })
          .then(result => { 
            document.getElementById('list-city').innerHTML = result.reduce((p, curr) => p + `<option value="${curr.name}">${curr.name}, ${curr.country}</option>`, '');
          })
          .catch(e => console.log(e)); 
      }
    });
  
    document.getElementsByClassName('js-selected-city')[0].addEventListener('click', async e => { 
      e.preventDefault();
      const value = document.getElementById('city').value;
  
      await fetch(getFetchUrl(fetchOpt, 'current', value))
        .then(result => {
          return result.json()
        })
        .then(result => {
          document.getElementById('card').innerHTML = `
            <div class="divcard">
                <img src="pin.png">
                <h3>${result.location.country}</h3>
                <h1>${result.location.name}</h1>
                <img class="wheatherImage" src="https:${result.current.condition.icon}">
                <h4>${result.current.condition.text}</h4>
                <h2 class="temp">${result.current.temp_c}°C</h2>
                <h5>Local time:</h5>
                <h5>${result.location.localtime}</h5>
            </div>
            <div class="humidity">
                <img src="humidity.png">
                <h4>Humidity:</h4>
                <h2>${result.current.humidity}%</h2>
            </div>
            <div class="feelslike">
                <img src="good-review.png">
                <h3>Feels like:</h3>
                <h2>${result.current.feelslike_c}</h2>
            </div>
            <div class="wind">
                <img src="wind.png" width: "100px">
                <h3>Wind:</h3>
                <h2>${result.current.wind_kph} km/h</h2>
            </div>` 
             ;
        })
        .catch(e => console.log(e));
    })
  
  }