import { API } from "./data.js";

const highestTemp = document.querySelectorAll("#dayTem");
const lowestTemp = document.querySelectorAll("#nytTem");

const dateTime = document.querySelectorAll(".date-time");

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
    console.error(error);
  }
})();
