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
const back = document.querySelector(".container");

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

(async () => {
  try {
    const response = await fetch(
      `${API.APIURL}/forecast?timesteps=1d&location=26.4815994,74.6048946`,
      requestOptions
    );
    const result = await response.json();
    let maxTemp = result.timelines.daily[1].values.temperatureMax;
    let minTemp = result.timelines.daily[1].values.temperatureMin;
    highestTemp.textContent = `${Math.round(maxTemp)}°`;
    lowestTemp.textContent = `${Math.round(minTemp)}°`;

    const sunrise = new Date(result.timelines.daily[1].values.sunriseTime)
    const set = new Date(result.timelines.daily[1].values.sunsetTime)

    humidity.textContent = `${Math.round(result.timelines.daily[1].values.humidityAvg)}%`;
    UV.textContent = `Low,${result.timelines.daily[1].values.uvIndexAvg}`;
    sunset.textContent = `${sunrise.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    })}, ${set.toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;

    const hourlyResponse = await fetch(
      `${API.APIURL}/forecast?timesteps=1h&location=26.4815994,74.6048946`,
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
        img[awai].src = "\\img\\sunlight.png";
        if (time > 6) {
          img[awai].src = "\\img\\night.png";
        }
      } else {
        if (time > 6) {
          img[awai].src = "\\img\\sunlight.png";
        } else {
          img[awai].src = "\\img\\night.png";
        }
      }
      awai++;
    });
  } catch (error) {
    console.error(error);
  }
})();
