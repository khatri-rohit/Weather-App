import { API } from "./data.js";

const today = document.querySelector(".date");
const highestTemp = document.querySelector("#dayTem");
const lowestTemp = document.querySelector("#nytTem");
const temperature = document.querySelectorAll("#currTem");

const back = document.querySelector(".container");

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
if (date.getHours() - 12 > 6) {
  back.style.background = `url("../img/beautiful-clouds-digital-art.jpg")`;
  back.style.backgroundRepeat = "no-repeat";
  back.style.backgroundSize = "cover";
}

const date1 = new Date("2024-05-17T17:00:00Z");
console.log(date1.getHours() - 12);

if (date1.getHours() > 12) {
  console.log(date1.getHours() - 12);
} else {
  console.log(date1.getHours());
}

const myHeaders = new Headers();
myHeaders.append("apikey", API.APIKEY);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

// async function todayTemperature() {
//   const response = await fetch(
//     `${API.APIURL}/realtime?location=26.4815994,74.6048946`,
//     requestOptions
//   );
//   const result = await response.json();
//   let temp = result.data.values.temperature;
//   return temp;
// }

// try {
//   const response = await fetch(
//     `${API.APIURL}/forecast?timesteps=1d&location=26.4815994,74.6048946`,
//     requestOptions
//   );
//   const result = await response.json();
//   let maxTemp = result.timelines.daily[0].values.temperatureMax;
//   let minTemp = result.timelines.daily[0].values.temperatureMin;
//   highestTemp.textContent = `${Math.round(maxTemp)}°`;
//   lowestTemp.textContent = `${Math.round(minTemp)}°`;
//   const todayTemp = todayTemperature();
//   todayTemp.then((res) => {
//     temperature.forEach((tem) => {
//       tem.textContent = Math.round(res);
//     });
//   });
// } catch (error) {
//   console.error(error);
// }
