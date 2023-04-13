var express = require("express");
var cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var bodyParser = require("body-parser");

// Client Credentials and OpenWeatherMap.org API key
const CLIENT_ID = "bf1874d2a49cecb96d55";
const CLIENT_SECRET = "04a9e6c588ed948ae55c5c4631308a76ebb0db91";
const WEATHER_API_KEY = "058e50b91f1a9e391dffb3a2b4f9e981";

var app = express();
app.use(cors());
app.use(bodyParser.json());

// Get the code returned from the successful login and use this to get the access token.
app.get("/getAccessToken", async function (req, res) {
  req.query.code;
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

//Pass access token as authorization header to get the user data
app.get("/getUserData", async function (req, res) {
  req.get("Authorization"); // Bearer Access Token
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), // Bearer Access Token
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// Get weather forecast data
// First we need to get the geolocation for the city provided.
// Then using the coordinates, we will send another API call to get the weather forecast data
app.get("/getforecast", async function (req, res) {
  req.query.city;
  await fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      req.query.city +
      "&appid=" +
      WEATHER_API_KEY,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((geomap_response) => {
      return geomap_response.json();
    })
    .then((geomap_data) => {
      if (geomap_data.length !== 0 && geomap_data.cod !== "400") {
        console.log(geomap_data);
        const params =
          "?lat=" +
          geomap_data[0].lat +
          "&lon=" +
          geomap_data[0].lon +
          "&appid=" +
          WEATHER_API_KEY;
        return fetch(
          "https://api.openweathermap.org/data/2.5/weather" + params,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        )
          .then((forecast_response) => {
            return forecast_response.json();
          })
          .then((forecast_data) => {
            console.log("forecast_data 2: " + forecast_data.length);
            if (forecast_data.length !== 0) {
              console.log(forecast_data);
              return res.json(forecast_data);
            }
          });
      } else {
        return {};
      }
    });
});

app.listen(4000, function () {
  console.log("CORS server running on port 4000");
});
