const url =
  "https://place-autocomplete1.p.rapidapi.com/autocomplete/json?input=ind&radius=500";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "175a467426mshe8285a4a411f620p16192bjsna983e4d66aed",
    "X-RapidAPI-Host": "place-autocomplete1.p.rapidapi.com",
  },
};
(async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();
