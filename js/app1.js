import { PLACE_API } from "./data.js";

const input = document.querySelector("input");
const button = document.querySelector(".btn");
const form = document.querySelector("form");
const places = document.querySelector(".result-box");

const myHeaders = new Headers();
myHeaders.append("X-RapidAPI-Key", PLACE_API.APIKEY);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

input.addEventListener("keyup", async () => {
  try {
    const response = await fetch(
      `${PLACE_API.APIURL}/json?input=${input.value}&radius=500`,
      requestOptions
    );
    const result = await response.json();
    places.style.display = "block";
    for (let i = 0; i < result.predictions.length; i++) {
      const place = document.createElement("p");
      place.setAttribute("class", "place");
      places.appendChild(place);
    }
    for (const key in result.predictions) {
      if (Object.values(result.predictions, key)) {
        const element = result.predictions[key];
        const plac = document.querySelectorAll(".place");
        plac[key].innerText = element.description;
      }
    }
    if (input.value === "" || input.value === " ") {
      places.style.display = "none";
    }
  } catch (error) {
    console.error(error);
  }
});

// async function gotLoaction(position) {
//   console.log(position.coords.latitude);
//   console.log(position.coords.longitude);
// }
// async function faliure() {
//   console.log("Error");
// }

// function loaction() {
//   navigator.geolocation.getCurrentPosition(gotLoaction, faliure);
// }

// loaction()
