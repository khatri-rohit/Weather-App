// const url =
//   "https://place-autocomplete1.p.rapidapi.com/autocomplete/json?input=ind&radius=500";
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "175a467426mshe8285a4a411f620p16192bjsna983e4d66aed",
//     "X-RapidAPI-Host": "place-autocomplete1.p.rapidapi.com",
//   },
// };
// (async () => {
//   try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// })();

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Accept-Encoding': 'gzip',
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    location: '42.3478, -71.0466',
    fields: ['temperatureAvg'],
    timesteps: ['1d'],
    startDate: '05-15',
    endDate: '05-16',
    units: 'metric'
  })
};

fetch('https://api.tomorrow.io/v4/historical/normals?apikey=K4bouBhk9LCjqpsGp4Rrtl9VOliv14ka', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));