import { API } from "./data.js";

const tomorrow = document.querySelector(".date");
const highestTemp = document.querySelector("#dayTem");
const lowestTemp = document.querySelector("#nytTem");

const nextTemp = document.querySelectorAll(".next-temp");
const nextTiming = document.querySelectorAll(".timing");
const humidity = document.querySelector(".hum");
const dew = document.querySelector(".dew");
const pressure = document.querySelector(".press");
const UV = document.querySelector(".uv");
const Visibility = document.querySelector(".visibi");

const back = document.querySelector(".container");

const date = new Date();
let setDate = `${date.getDate()} ${date.toLocaleDateString("en-us", {
  weekday: "long",
  month: "long",
})}`;
tomorrow.textContent = setDate;

if (date.getHours() - 12 > 6) {
  back.style.background = "url(../img/nyt.jpg)";
  back.style.backgroundRepeat = "no-repeat";
  back.style.backgroundSize = "cover";
}

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
    todayTemp.then((res) => {
      temperature.forEach((tem) => {
        tem.textContent = Math.round(res);
      });
    });

    const hourlyResponse = await fetch(
      `${API.APIURL}/forecast?timesteps=1h&location=26.4815994,74.6048946`,
      requestOptions
    );
    const hourlyResult = await hourlyResponse.json();
    let arr = 1;
    nextTemp.forEach((nxtTmp) => {
      nxtTmp.textContent = `${Math.round(
        hourlyResult.timelines.hourly[arr].values.temperature
      )}°`;
      arr++;
    });
    arr = 1;
    nextTiming.forEach((nxtTime) => {
      const date1 = new Date(hourlyResult.timelines.hourly[arr].time);
      let time = date1.getHours();
      var noon;
      noon = "am";
      if (time > 12) {
        noon = "pm";
        time -= 12;
      }
      if (noon === "pm" && time < 12) {
        img[arr - 1].src = "../img/sunlight.png";
        if (time > 5) {
          img[arr - 1].src = "../img/night.png";
        }
      } else {
        if (time > 6) {
          img[arr - 1].src = "../img/sunlight.png";
        } else {
          img[arr - 1].src = "../img/night.png";
        }
      }
      if (time === 0) time += 12;
      nxtTime.textContent = `${time}:00 ${noon}`;
      arr++;
    });
  } catch (error) {
    console.error(error);
  }
})();
