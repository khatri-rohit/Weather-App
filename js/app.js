import { API } from "./data.js";
var myHeaders = new Headers();
myHeaders.append("apikey", API.APIKEY);

let requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};


fetch(`${API.APIURL}/realtime?location=Indore, Madhya Pradesh, India`, requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
