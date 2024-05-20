import { API } from "./data.js";

const tomorrow = document.querySelector(".date");
const highestTemp = document.querySelector("#dayTem");
const lowestTemp = document.querySelector("#nytTem");

const nextTemp = document.querySelectorAll(".next-temp");
const nextTiming = document.querySelectorAll(".timing");
const humidity = document.querySelector(".hum");
const UV = document.querySelector(".uv");
const sunset = document.querySelector(".sunset");

const img = document.querySelectorAll(".img");
const input = document.querySelector("input");
const container = document.querySelector(".container");

const date = new Date();
date.setDate(date.getDate() + 1);
let setDate = `${date.getDate()} ${date.toLocaleDateString("en-us", {
  weekday: "long",
  month: "long",
})}`;
tomorrow.textContent = setDate;

const myHeaders = new Headers();
myHeaders.append("apikey", API.APIKEY);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

function clearStorage() {
  let session = sessionStorage.getItem("register");
  if (session == null) {
    localStorage.removeItem("choosen");
  }
  sessionStorage.setItem("register", 1);
}
window.addEventListener("load", clearStorage);

(async () => {
  try {
    if (localStorage.getItem("choosen")) {
      const Location = localStorage.getItem("choosen");
      userLocation(Location);
    } else {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        localStorage.setItem("lati", pos.coords.latitude);
        localStorage.setItem("long", pos.coords.longitude);
        currentLocation();
        localStorage.clear();
      });
    }
  } catch (error) {
    console.error(error + " Not getting Location ");
  }
})();


function unload(event) {
  localStorage.removeItem("choosen");
}
window.addEventListener('beforeunload',unload)

function setTime(time, arr, awai) {
  var noon;
  noon = "am";
  if (time > 12) {
    noon = "pm";
    time -= 12;
  }
  if (time === 0) time += 12;
  nextTiming[arr].textContent = `${time}:00 ${noon}`;
  if (noon === "pm" && time < 12) {
    img[awai].src = "..\\img\\sunlight.png";
    if (time > 6) {
      img[awai].src = "..\\img\\night.png";
    }
  } else {
    if (time > 6) {
      img[awai].src = "..\\img\\sunlight.png";
    } else {
      img[awai].src = "..\\img\\night.png";
    }
  }
}

function getCountry(local) {
  var newlocal = local.split(" ");
  var name = newlocal[newlocal.length - 1];
  return name;
}

async function userLocation(local) {
  try {
    input.value = local;
    try {
      const response = await fetch(
        `${API.APIURL}/forecast?timesteps=1d&location=${local}`,
        requestOptions
      );
    } catch (err) {
      console.log(err + "400 Bad Request");
    }
    const result = await response.json();
    let maxTemp = result.timelines.daily[1].values.temperatureMax;
    let minTemp = result.timelines.daily[1].values.temperatureMin;
    highestTemp.textContent = `${Math.round(maxTemp)}°`;
    lowestTemp.textContent = `${Math.round(minTemp)}°`;

    const sunrise = new Date(result.timelines.daily[1].values.sunriseTime);
    const set = new Date(result.timelines.daily[1].values.sunsetTime);

    humidity.textContent = `${Math.round(
      result.timelines.daily[1].values.humidityAvg
    )}%`;
    UV.textContent = `Low,${result.timelines.daily[1].values.uvIndexAvg}`;
    sunset.textContent = `${sunrise.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    })}, ${set.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const hourlyResponse = await fetch(
      `${API.APIURL}/forecast?timesteps=1h&location=${local}`,
      requestOptions
    );
    const hourlyResult = await hourlyResponse.json();
    const Data = hourlyResult.timelines.hourly;
    var array = [];
    const newData = Data.filter((key) => {
      const nextDate = new Date(key.time);
      if (nextDate.getDate() == date.getDate() && nextDate.getHours() > 6) {
        array.push(key.time);
        array.push(key.values.temperature);
      }
    });

    let arr = 1;
    nextTemp.forEach((nxtTmp) => {
      nxtTmp.textContent = `${Math.round(array[arr])}°`;
      arr += 2;
    });

    arr = 0;
    let awai = 0;
    let len = 0;
    var country = ct.getAllCountries();
    console.log(country);

    var Name = getCountry(local);
    nextTiming.forEach((nxtTime) => {
      const date1 = new Date(array[arr]);

      for (const key in country) {
        if (Object.values(country, key)) {
          const element = country[key];
          if (element.name === Name) {
            var timestep = ct.getTimezone(element.timezones[0]);
            var time = parseInt(timestep.utcOffsetStr);
            date1.setUTCHours(date1.getUTCHours() + time);
          }
        }
      }

      let timing = date1.getUTCHours();
      setTime(timing, len, awai);
      arr += 2;
      awai++;
      len++;
    });
  } catch (err) {
    alert(`Status :- 429 Too Many Requests\nAPI key limit reached wait here or try again later.
    `);
    container.style.display = "none";
    location.href = "response.html";
  }
}

async function currentLocation() {
  try {
    const latitude = localStorage.getItem("lati");
    const longitude = localStorage.getItem("long");

    const response = await fetch(
      `${API.APIURL}/forecast?timesteps=1d&location=${latitude},${longitude}`,
      requestOptions
    );
    const result = await response.json();
    let maxTemp = result.timelines.daily[1].values.temperatureMax;
    let minTemp = result.timelines.daily[1].values.temperatureMin;
    highestTemp.textContent = `${Math.round(maxTemp)}°`;
    lowestTemp.textContent = `${Math.round(minTemp)}°`;

    const sunrise = new Date(result.timelines.daily[1].values.sunriseTime);
    const set = new Date(result.timelines.daily[1].values.sunsetTime);

    humidity.textContent = `${Math.round(
      result.timelines.daily[1].values.humidityAvg
    )}%`;
    UV.textContent = `Low,${result.timelines.daily[1].values.uvIndexAvg}`;
    sunset.textContent = `${sunrise.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    })}, ${set.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const hourlyResponse = await fetch(
      `${API.APIURL}/forecast?timesteps=1h&location=${latitude},${longitude}`,
      requestOptions
    );
    const hourlyResult = await hourlyResponse.json();
    const Data = hourlyResult.timelines.hourly;
    var array = [];
    const newData = Data.filter((key) => {
      const nextDate = new Date(key.time);
      if (nextDate.getDate() == date.getDate() && nextDate.getHours() > 6) {
        array.push(key.time);
        array.push(key.values.temperature);
      }
    });

    let arr = 1;
    nextTemp.forEach((nxtTmp) => {
      nxtTmp.textContent = `${Math.round(array[arr])}°`;
      arr += 2;
    });

    arr = 0;
    let awai = 0;
    nextTiming.forEach((nxtTime) => {
      const date1 = new Date(array[arr]);
      let time = date1.getHours();
      var noon;
      noon = "am";
      if (time > 12) {
        noon = "pm";
        time -= 12;
      }
      if (time === 0) time += 12;
      nxtTime.textContent = `${time}:00 ${noon}`;
      arr += 2;
      if (noon === "pm" && time < 12) {
        img[awai].src = "..\\img\\sunlight.png";
        if (time > 6) {
          img[awai].src = "..\\img\\night.png";
        }
      } else {
        if (time > 6) {
          img[awai].src = "..\\img\\sunlight.png";
        } else {
          img[awai].src = "..\\img\\night.png";
        }
      }
      awai++;
    });
  } catch (error) {
    alert(`Status :- 429 Too Many Requests\nAPI key limit reached wait here or try again later.
    `);
    console.error(error);
    container.style.display = "none";
    location.href = "response.html";
  }
}
