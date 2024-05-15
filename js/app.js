import dotenv from "dotenv"


var myHeaders = new Headers();
let key = "xauunvDe8N05BUCjZLPVgywDQh0FnsxT";
myHeaders.append("apikey", key);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "https://api.tomorrow.io/v4/weather/realtime?location=ajmer",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));


const apikey = process.env.VITE_API_KEY;
console.log(apikey);
