import { API } from "./data.js";

const today = document.querySelector(".date");
const highestTemp = document.querySelector("#dayTem");
const lowestTemp = document.querySelector("#nytTem");
const temperature = document.querySelectorAll("#currTem");

const background = document.querySelector(".container");

const myHeaders = new Headers();
myHeaders.append("apikey", API.APIKEY);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

setInterval(() => {
  const date = new Date();
  let setDate = `${date.getDate()} ${date.toLocaleTimeString("en-us", {
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  today.textContent = setDate;
});

const date = new Date();
if (date.getHours() > 19 ) {
  background.style.background = `url("../img/beautiful-clouds-digital-art.jpg")`;
  background.style.backgroundRepeat = "no-repeat";
  background.style.backgroundSize = "cover";
} else {
  background.style.background = `url("../img/mountains-with-cloudy-sky-surface.jpg")`;
  background.style.backgroundRepeat = "no-repeat";
  background.style.backgroundSize = "cover";
}

async function todayTemperature() {
  const response = await fetch(
    `${API.APIURL}/realtime?location=26.4815994,74.6048946`,
    requestOptions
  );
  const result = await response.json();
  let temp = result.data.values.temperature;
  return temp;
}

try {
  const response = await fetch(
    `${API.APIURL}/forecast?timesteps=1d&location=26.4815994,74.6048946`,
    requestOptions
  );
  const result = await response.json();
  let maxTemp = result.timelines.daily[0].values.temperatureMax;
  let minTemp = result.timelines.daily[0].values.temperatureMin;
  highestTemp.textContent = `${Math.round(maxTemp)}°`;
  lowestTemp.textContent = `${Math.round(minTemp)}°`;
  const todayTemp = todayTemperature();
  todayTemp.then((res) => {
    temperature.forEach((tem) => {
      tem.textContent = Math.round(res);
    });
  });
} catch (error) {
  console.error(error);
}
