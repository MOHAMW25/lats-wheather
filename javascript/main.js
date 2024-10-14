 let IPkKey = `347c5c94292943eabf1164044241110`; 

// input   
let input = document.getElementById("input");
let buttonForm = document.getElementById("button-addon2");

// card 1
let Day = document.getElementById("day");
let History = document.getElementById("history"); 
let Location = document.getElementById("location");
let temp = document.getElementById("temp");
let icon = document.getElementById("icon");
let clear = document.getElementById("clear");

// card 2
let carday2 = document.getElementById("carday2");
let iconcard2 = document.getElementById("icon-card2");
let tempcard2 = document.getElementById("temp-card2");
let clearcard2 = document.getElementById("clear-card2");

// card 3
let Day3 = document.getElementById("day3");
let iconcard3 = document.getElementById("icon-card3");
let tempcard3 = document.getElementById("temp-card3");
let clearcard3 = document.getElementById("clear-card3");

function getCurrentDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    return days[today.getDay()];
}

async function weather() {
    const location = input.value;

    
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${IPkKey}&q=${location}&days=3`);
        const weatherData = await response.json();

        // عرض بيانات اليوم الحالي
        temp.innerHTML = `${weatherData.current.temp_c} °C`;  
        Location.innerHTML = `${weatherData.location.name}`; 
        clear.innerHTML = weatherData.current.condition.text;
        const lastUpdated = new Date(weatherData.current.last_updated);
        const options = {
            day: 'numeric',
            month: 'long' 
        };
        History.innerHTML = lastUpdated.toLocaleDateString('en-US', options);
        Day.innerHTML = getCurrentDay();
        icon.src = `https:${weatherData.current.condition.icon}`;

    
        const day2 = weatherData.forecast.forecastday[1];
        carday2.innerHTML = new Date(day2.date).toLocaleDateString('en-US', { weekday: 'long' });
        tempcard2.innerHTML = `${day2.day.avgtemp_c} °C`;
        clearcard2.innerHTML = day2.day.condition.text;
        iconcard2.src = `https:${day2.day.condition.icon}`;

         
        const day3 = weatherData.forecast.forecastday[2];
        Day3.innerHTML = new Date(day3.date).toLocaleDateString('en-US', { weekday: 'long' });
        tempcard3.innerHTML = `${day3.day.avgtemp_c} °C`;
        clearcard3.innerHTML = day3.day.condition.text;
        iconcard3.src = `https:${day3.day.condition.icon}`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please check the location and try again.");
    }
}

buttonForm.addEventListener("click", weather);
