require('dotenv').config();
// 👆 has dependencies if run in browser

const express = require('express');
const request = require('request');
const cors = require('cors');

let app = express();
app.use(cors());

// APIs to try
// Google Maps
// Mapbox
// Foursquare
// Developer here

app.get("/", function(req, res) {

  // if (!("geolocation" in navigator)) res.send("Hey! Please use a modern browser.");
  // function getCoords() {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     return (position.coords.latitude, position.coords.longitude)
  //   });
  // }
  // 👆 navigator is a browser API

  let user = {
    coords: {
      lat: "-33.8670522",
      lng: "151.1957362"
    }
  };

  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${user.coords.lat},${user.coords.lng}&radius=500&type=restaurant&keyword=cruise&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
      let data = JSON.parse(body).results;
      for (let index in data) {
        let location = data[index];
        console.log(location.name);
      }
    }
  });

});

var server = app.listen(process.env.PORT || 5000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening on port %s", port);
});
