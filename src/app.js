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
const yourLocation = document.querySelector(".yourLocation");

const input = document.querySelector("input");
const img = document.querySelectorAll(".img");
const toImg = document.querySelector(".currImg");

const container = document.querySelector(".container");

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
  toImg.src = "..\\img\\sunlight.png";
} else if (date.getHours() >= 6 && date.getHours() < 18) {
  toImg.src = "..\\img\\sunlight.png";
} else {
  toImg.src = "..\\img\\night.png";
}

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

function setTime(time, arr) {
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
  nextTiming[arr - 1].textContent = `${time}:00 ${noon}`;
}

function getCountry(local) {
  var newlocal = local.split(" ");
  var name = newlocal[newlocal.length - 1];
  return name;
}

async function userLocation(local) {
  try {
    input.value = local;

    const response = await fetch(
      `${API.APIURL}/forecast?timesteps=1d&location=${local}`,
      requestOptions
    );

    if (response.status === 400)
      console.log("Bad Request\nQuery perameter error");
    else if (response.status == 429)
      console.log("API Reached It's Request Limit");

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
    var country = ct.getAllCountries();
    var Name = getCountry(local);
    nextTiming.forEach((nxtTime) => {
      const date1 = new Date(hourlyResult.timelines.hourly[arr].time);

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
      setTime(timing, arr);
      arr++;
    });
  } catch (error) {
    localStorage.clear()
    alert(
      `Status :- 429 Too Many Requests\nAPI key limit reached wait here or try again later.`
    );
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

    if (response.status === 400)
      console.log("Bad Request\nQuery perameter error");
    else if (response.status == 429)
      console.log("API Reached It's Request Limit");

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
    alert(`Status :- 429 Too Many Requests\nAPI key limit reached wait here or try again later.
    `);
    if (error) {
      console.log(error + " <>");
    }
    container.style.display = "none";
    location.href = "response.html";
  }
}

yourLocation.addEventListener("click", () => {
  localStorage.clear();
  input.value = "";
  navigator.geolocation.getCurrentPosition(async (pos) => {
    localStorage.setItem("lati", pos.coords.latitude);
    localStorage.setItem("long", pos.coords.longitude);
    currentLocation();
  });
});
