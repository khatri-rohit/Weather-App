// import { PLACE_API } from "./data.js";

// let myHeaders = new Headers();
// myHeaders.append("X-RapidAPI-Key", PLACE_API.APIKEY);

// let requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow",
// };

// fetch(`${PLACE_API.APIURL}/json?input=jaipur&radius=500`, requestOptions)
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

async function gotLoaction(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}
async function faliure() {
  console.log("Error");
}

function loaction() {
  navigator.geolocation.getCurrentPosition(gotLoaction, faliure);
}

loaction()