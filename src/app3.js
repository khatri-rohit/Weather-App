import { API } from "./data.js";

var data = ct.getCountry("IN");
console.log(data);

const highestTemp = document.querySelectorAll("#dayTem");
const lowestTemp = document.querySelectorAll("#nytTem");

const dateTime = document.querySelectorAll(".date-time");
const input = document.querySelector("input");

const container = document.querySelector(".container");

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
      });
    }
  } catch (error) {
    console.error(error + " Not getting Location ");
  }
})();

async function userLocation(local) {
  try {
    input.value = local;
    console.log("Location -> ", local);
    const response = await fetch(
      `${API.APIURL}/forecast?timesteps=1d&location=${local}`,
      requestOptions
    );
    const result = await response.json();
    let len = 0;
    highestTemp.forEach((high) => {
      let maxTemp = result.timelines.daily[len].values.temperatureMax;
      high.textContent = `${Math.round(maxTemp)}°`;
      len++;
    });
    len = 0;
    lowestTemp.forEach((low) => {
      let minTemp = result.timelines.daily[len].values.temperatureMin;
      low.textContent = `${Math.round(minTemp)}°`;
      len++;
    });

    len = 1;
    dateTime.forEach((time) => {
      const date = new Date(result.timelines.daily[len].time);
      time.textContent = `${date.getDate()} ${date.toLocaleDateString("en-us", {
        month: "long",
      })}, ${date.toLocaleDateString("en-us", {
        weekday: "long",
      })}`;
      len++;
    });
  } catch (error) {
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
    let len = 0;
    highestTemp.forEach((high) => {
      let maxTemp = result.timelines.daily[len].values.temperatureMax;
      high.textContent = `${Math.round(maxTemp)}°`;
      len++;
    });
    len = 0;
    lowestTemp.forEach((low) => {
      let minTemp = result.timelines.daily[len].values.temperatureMin;
      low.textContent = `${Math.round(minTemp)}°`;
      len++;
    });

    len = 1;
    dateTime.forEach((time) => {
      const date = new Date(result.timelines.daily[len].time);
      time.textContent = `${date.getDate()} ${date.toLocaleDateString("en-us", {
        month: "long",
      })}, ${date.toLocaleDateString("en-us", {
        weekday: "long",
      })}`;
      len++;
    });
  } catch (error) {
    alert(`Status :- 429 Too Many Requests\nAPI key limit reached wait here or try again later.
    `);
    container.style.display = "none";
    location.href = "response.html";
  }
}
