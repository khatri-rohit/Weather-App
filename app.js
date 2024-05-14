const myHeaders = new Headers();
myHeaders.append(
  "Cookie",
  "__cf_bm=a2._O674bNXk5CS_llWrz1rZRIsfpGUjRmDjQzJbFvY-1715633945-1.0.1.1-RBBf1K6dxVhwLEvdoRkLGMhQSRI7Rn6khEE3aSiUa1EG.iVo.Bf5WUF5XkoGu8u3BN3XdphEgbP3_FoM5tzG5w"
);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

(async () => {
  try {
    const response = await fetch(
      "https://api.tomorrow.io/v4/weather/forecast?location=america&timesteps=1d&apikey=K4bouBhk9LCjqpsGp4Rrtl9VOliv14ka",
      requestOptions
    );
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();
