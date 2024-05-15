import { API } from "./data.js";
console.log("ROhit");
// console.log(API);
var myHeaders = new Headers();
myHeaders.append("apikey", "xauunvDe8N05BUCjZLPVgywDQh0FnsxT");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(`${API.APIURL}/realtime?location=ajmer`, requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
