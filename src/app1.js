import { PLACE_API } from "./data.js";

const input = document.querySelector("input");
const places = document.querySelector(".result-box");
const form = document.querySelector("form");

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
        plac[key].innerHTML = element.description;
        plac.forEach((place) => {
          place.addEventListener("click", getPlace(place.textContent));
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            getPlace(place.textContent);
          });
        });
      }
    }
    if (input.value === "" || input.value === " ") {
      places.style.display = "none";
    }
  } catch (error) {
    console.error(error);
  }
});

function getPlace(place) {
  localStorage.setItem("choosen", place);
  location.href = "index.html";
}
