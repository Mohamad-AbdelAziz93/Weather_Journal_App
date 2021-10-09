/* Global Variables */
const API_URL = "http://api.openweathermap.org/data/2.5/weather?id="
const API_KEY = "&appid=37849b115c3a8e5531fa6a07d6db9de6"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const getData = async function(url="") {
    const resp = await fetch(url);
    return await resp.json();
}

const postData = async function(url="", data={}) {
    const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
    });
};

const getWeather = async function() {
    const url = API_URL + document.querySelector("#zip").value + API_KEY
    
    const resp = await fetch(url);
    return await resp.json();
};


/* Event listeners */
const button = document.querySelector("#generate");

button.addEventListener("click", () => {
getWeather()
.then(function(temp) {
    const dataObj = {temperature: temp.main.temp, date: newDate, userIn: document.querySelector("#feelings").value};
    postData("/PostData", dataObj);
})
.then(() => {
    return getData("/GetData");
})
.then(function(lastEntry) {
    /* Make div invisible before modifying the data to minimize repainting */
    document.querySelector("#entryHolder").style.display = "none";
    document.querySelector("#date").innerHTML = lastEntry.date;
    document.querySelector("#temp").innerHTML = lastEntry.temperature;
    document.querySelector("#content").innerHTML = lastEntry.userIn;
    document.querySelector("#entryHolder").style.display = "block";
});
});
