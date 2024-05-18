import { API } from "./data.js";

const today = document.querySelector(".date");
const highestTemp = document.querySelector("#dayTem");
const lowestTemp = document.querySelector("#nytTem");
const temperature = document.querySelectorAll("#currTem");

const nextTemp = document.querySelectorAll(".next-temp");
const nextTiming = document.querySelectorAll(".timing");
const humidity = document.querySelector(".hum");
const dew = document.querySelector(".dew");
const pressure = document.querySelector(".press");
const UV = document.querySelector(".uv");
const Visibility = document.querySelector(".visibi");

const input = document.querySelector("input");
const img = document.querySelectorAll(".img");
const toImg = document.querySelector("img");

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
const myHeaders = new Headers();
myHeaders.append("apikey", API.APIKEY);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

async function todayTemperature(value) {
  const response = await fetch(
    `${API.APIURL}/realtime?location=${value}`,
    requestOptions
  );
  const result = await response.json();

  humidity.textContent = `${result.data.values.humidity}%`;
  dew.textContent = `${result.data.values.dewPoint}℃`;
  pressure.textContent = `${result.data.values.pressureSurfaceLevel} mBar`;
  UV.textContent = `Low,${result.data.values.uvIndex}`;
  Visibility.textContent = `${Math.round(result.data.values.visibility)}km`;

  let temp = result.data.values.temperature;
  return temp;
}

if (date.getHours() < 12) {
  toImg.src = "..\\img\\night.png";
} else {
  toImg.src = "..\\img\\sunlight.png";
}
// localStorage.clear()
(async () => {
  try {
    if (localStorage.getItem("choosen")) {
      const Location = localStorage.getItem("choosen");
      console.log("User Location");
      userLocation(Location.toLowerCase().replace(",", " "));
    } else {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        localStorage.setItem("lati", pos.coords.latitude);
        localStorage.setItem("long", pos.coords.longitude);
        console.log("Current Location");
      });
    }
  } catch (error) {
    console.log(error);
  }
})();

async function userLocation(local) {
  try {
    const response = await fetch(
      `${API.APIURL}/forecast?timesteps=1d&location=${local}`,
      requestOptions
    );
    input.value = local;
    const result = await response.json();
    let maxTemp = result.timelines.daily[0].values.temperatureMax;
    let minTemp = result.timelines.daily[0].values.temperatureMin;
    highestTemp.textContent = `${Math.round(maxTemp)}°`;
    lowestTemp.textContent = `${Math.round(minTemp)}°`;
    const todayTemp = todayTemperature(local);
    todayTemp.then((res) => {
      temperature.forEach((tem) => {
        tem.textContent = Math.round(res);
      });
    });

    const hourlyResponse = await fetch(
      `${API.APIURL}/forecast?timesteps=1h&location=${local}`,
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
        img[arr - 1].src = "..\\img\\sunlight.png";
        if (time > 6) {
          img[arr - 1].src = "..\\img\\night.png";
        }
      } else {
        if (time > 5) {
          img[arr - 1].src = "..\\img\\sunlight.png";
        } else {
          img[arr - 1].src = "..\\img\\night.png";
        }
      }
      if (time === 0) time += 12;
      nxtTime.textContent = `${time}:00 ${noon}`;
      arr++;
    });
    localStorage.clear()
  } catch (error) {
    console.error(error);
  }
}
(async () => {
  try {
    const latitude = localStorage.getItem("lati");
    const longitude = localStorage.getItem("long");

    const response = await fetch(
      `${API.APIURL}/forecast?timesteps=1d&location=${latitude},${longitude}`,
      requestOptions
    );
    const result = await response.json();
    let maxTemp = result.timelines.daily[0].values.temperatureMax;
    let minTemp = result.timelines.daily[0].values.temperatureMin;
    highestTemp.textContent = `${Math.round(maxTemp)}°`;
    lowestTemp.textContent = `${Math.round(minTemp)}°`;

    const currentLocation = `${latitude},${longitude}`;
    const todayTemp = todayTemperature(currentLocation);
    todayTemp.then((res) => {
      temperature.forEach((tem) => {
        tem.textContent = Math.round(res);
      });
    });

    const hourlyResponse = await fetch(
      `${API.APIURL}/forecast?timesteps=1h&location=${latitude},${longitude}`,
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
        img[arr - 1].src = "..\\img\\sunlight.png";
        if (time > 6) {
          img[arr - 1].src = "..\\img\\night.png";
        }
      } else {
        if (time > 5) {
          img[arr - 1].src = "..\\img\\sunlight.png";
        } else {
          img[arr - 1].src = "..\\img\\night.png";
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
