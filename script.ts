import { apiKey } from "./apikeys";

//caching the dom

const temperatureDisplay = document.getElementById('temperature-display');
const dateDisplay = document.getElementById('date-display');
const townName = document.getElementById('city-display');
const inputField = document.querySelector('.main__search__searchbar');
const submitButton = document.querySelector('.main__search__submit-button');
const weatherDescribed = document.querySelector('.weather-description');

const prediction1Parent = document.getElementById('day1');
const prediction2Parent = document.getElementById('day2');
const prediction3Parent = document.getElementById('day3');
const prediction4Parent = document.getElementById('day4');


const prediction1 = prediction1Parent.querySelector('.tempterature-display-prediction-number');
const prediction2 = prediction2Parent.querySelector('.tempterature-display-prediction-number');
const prediction3 = prediction3Parent.querySelector('.tempterature-display-prediction-number');
const prediction4 = prediction4Parent.querySelector('.tempterature-display-prediction-number');


const prediction1Display = prediction1Parent.querySelector('.prediction-date');
const prediction2Display = prediction2Parent.querySelector('.prediction-date');
const prediction3Display = prediction3Parent.querySelector('.prediction-date');
const prediction4Display = prediction4Parent.querySelector('.prediction-date');



//loading screen 
loading();

const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const loader = document.getElementById("loader");


function loading() {
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.display = 'none';
        
        weatherApp.getDate();
        setTimeout(() => (header.style.opacity = '100'), 100);
        setTimeout(() => (main.style.opacity = '100'), 300);
        setTimeout(() => (footer.style.opacity = '100'), 500);
    }, 2500);
}


//event listeners for submit button + enter

document.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        weatherApp.getDate();
        weatherApp.fetchWeather();
        
    }
})

submitButton.addEventListener('click', function() {
    weatherApp.getDate();
    weatherApp.fetchWeather();
    
});

//app object

const weatherApp = {
    _apiKey: apiKey,

    _city: "",

    _userInput: "",

    _responseJson: {},

    _currentWeather: '',

    _currentTemperature: 0,

    _date: '',

    _icon: '',

    _weatherDescription: '',

    get apiKey() {
        return this._apiKey;
    },

    get city() {
        return this._city;
    },

    get userInput() {
        return this._userInput;
    },

    get responseJson() {
        return this._responseJson;
    },

    get currentWeather() {
        return this._currentWeather;
    },

    get currentTemperature() {
        return this._currentTemperature;
    },

    get date() {
        return this._date;
    },

    get icon() {
        return this._icon;
    },

    get weatherDescription() {
        return this._weatherDescription;
    },

    set weatherDescription(description) {
        this._weatherDescription = description;
    },

    set icon(icon) {
        this._icon = icon;
    },

    set date(date) {
        this._date = date;
    },

    set currentTemperature(temp) {
        this._currentTemperature = temp;
    },

    set currentWeather(weather) {
        this._currentWeather = weather;
    },

    set responseJson(newResponse) {
        this._responseJson = newResponse;
    },

    set city(userInputCity) {
        this._city = userInputCity;
    },


    fetchWeather() {
        let inputCity: string = (<HTMLInputElement>inputField).value;      
        this._city = inputCity; 
        let townNameUppercased = inputCity.charAt(0).toLocaleUpperCase() + inputCity.slice(1);  //good enough for now           
        townName.innerHTML = townNameUppercased;
        let apiResponse = fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this._city}&appid=${this._apiKey}`)
            
            .then((response) => response.json())
            .then((data) => this.filterJson(data))
            .catch((error) => console.log(`Request failed with reason: ${error}`))
    },

    filterJson(obj) {
        
        this._responseJson = obj;
        let tempArrDay1 = [];
        let tempArrDay2 = [];
        let tempArrDay3 = [];
        let tempArrDay4 = [];
        let tempTimeArr = [];

        let initialDate = this._date; //to decide the date
        
        for(let i = 0; i < obj.list.length; i++) {
            if(i == 0) { //separate the first one and display it on screen
                
                
                let currentObject = obj.list[0]; // to obtain the initial temperature to be displayed 
                this.getWeatherDescription(currentObject);
                weatherDescribed.innerHTML = this._weatherDescription;
                let currentTemp = currentObject.main.temp;
                this._currentTemperature = Math.floor(currentTemp - 273.15); //kelvin to celsius with no float
                
                this.showTemp(temperatureDisplay);
            } else {
                
                let timeStampToCheck: string = obj.list[i].dt_txt;
                let tempStampToCheck: number = obj.list[i].main.temp;
                
                let tempTimeStamp = [timeStampToCheck, tempStampToCheck];
                tempTimeArr.push(tempTimeStamp);
            }
  
        }
        
        //tested
        for(let j = 0; j < tempTimeArr.length; j++) { 
            let stringArr = tempTimeArr[j][0].split('');
            let firstDigitDate = stringArr[8]; // again, getting the day date
            let secondDigitDate = stringArr[9];
            let firstDigitHour = stringArr[11];
            let secondDigitHour = stringArr[12];
            
            let dateCheck: number = parseInt(`${firstDigitDate}${secondDigitDate}`);
            let hourCheck: number = parseInt(`${firstDigitHour}${secondDigitHour}`);
            
            
            //arrays to calculate average temp 

            //if tree to check which date we are dealing with  --- doesnt work

            if(dateCheck == (initialDate + 1)) {
                if(hourCheck > 7 && hourCheck < 22) {
                    tempArrDay1.push(tempTimeArr[j][1]);                
                }
            }
            if(dateCheck === initialDate + 2) {
                if(hourCheck > 7 && hourCheck < 22) {
                    tempArrDay2.push(tempTimeArr[j][1]);
                }
            }
            if(dateCheck === initialDate + 3) {
                if(hourCheck > 7 && hourCheck < 22) {
                    tempArrDay3.push(tempTimeArr[j][1]);
                }
            }
            if(dateCheck === initialDate + 4) {
                if(hourCheck > 7 && hourCheck < 22) {
                    tempArrDay4.push(tempTimeArr[j][1]);
                }
            }
        }

        let averageTempDay1 = () => {
            let total = 0;
            for(let l = 0; l < tempArrDay1.length; l++) {
                let convertCtK = Math.floor(tempArrDay1[l] - 273.15);
                total += convertCtK;
            }
            return Math.floor(total / (tempArrDay1.length - 1)); //getting average and tranferring k to c, same for following
        };
        
        let averageTempDay2 = () => {
            let total = 0;
            for(let l = 0; l < tempArrDay2.length; l++) {
                let convertCtK = tempArrDay2[l] - 273.15;
                total += convertCtK;
            }
            return Math.floor(total/(tempArrDay2.length -1));
        };
        
        let averageTempDay3 = () => {
            let total = 0;
            for(let l = 0; l < tempArrDay3.length; l++) {
                let convertCtK = tempArrDay3[l] - 273.15;
                total += convertCtK;
            }
            return Math.floor(total/(tempArrDay3.length - 1));
        };

        let averageTempDay4 = () => {
            let total = 0;
            for(let l = 0; l < tempArrDay4.length; l++) {
                let convertCtK = tempArrDay4[l] - 273.15;
                total += convertCtK;
            }
            return Math.floor(total/(tempArrDay4.length - 1));
        };

        //display average
        this.showTemp(prediction1, averageTempDay1());
        this.showTemp(prediction2, averageTempDay2());
        this.showTemp(prediction3, averageTempDay3());
        this.showTemp(prediction4, averageTempDay4());


    },

    //presentation based on data

    showTemp(element, averageTemperature: number) {
        let theme = '';
        if(averageTemperature == undefined) {
            if(averageTemperature < 5) {
                theme = 'blue';
            }
            if(averageTemperature < 20) {
                theme = 'green';
            }
            if(averageTemperature < 30) {
                theme = 'yellow';
            }
            if(averageTemperature > 30) {
                theme = 'red';
            }
        }
        let temperature = 0;
        if(averageTemperature) { //this will be provded for all but first element
            temperature = averageTemperature;
            element.innerText = `${temperature}`;
            return;
        }
        temperature = this._currentTemperature;
        element.innerHTML = `${temperature}°`;
    },

    getDate() {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let monthStr = '';
        let year = currentDate.getFullYear();
        
        this._date = day;
        
        switch(month) {
            case 1:
                monthStr = 'January';
                break;
            case 2:
                monthStr = 'February';
                break;
            case 3:
                monthStr = 'March';
                break;
            case 4:
                monthStr = 'April';
                break;
            case 5:
                monthStr = 'May';
                break;
            case 6:
                monthStr = 'June';
                break;
            case 7:
                monthStr = 'July';
                break;
            case 8:
                monthStr = 'August';
                break;
            case 9:
                monthStr = 'September';
                break;
            case 10:
                monthStr = 'October';
                break;
            case 11:
                monthStr = 'November';
                break;
            case 12:
                monthStr = 'December';
                break;
        }

        dateDisplay.innerHTML = `${day} ${monthStr} ${year}`
        prediction1Display.innerHTML = `${day + 1} ${monthStr}`;
        prediction2Display.innerHTML = `${day + 2} ${monthStr}`;
        prediction3Display.innerHTML = `${day + 3} ${monthStr}`;
        prediction4Display.innerHTML = `${day + 4} ${monthStr}`;
        
    },

    getWeatherDescription(obj) { //html not yet implemented
        let weatherState: string = obj.weather[0].description;
        console.log(weatherState);
        this._weatherDescription = weatherState;
    }
}
