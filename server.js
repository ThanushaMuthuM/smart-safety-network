const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

const GOOGLE_API_KEY = "YOUR_API_KEY";

// Convert lat/lng to address
async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await axios.get(url);
  return response.data.results[0].formatted_address;
}

// Save to log file
function saveLog(data) {
  fs.appendFileSync("sos_logs.txt", JSON.stringify(data) + "\n");
}

// SOS API
app.post("/sos", async (req, res) => {
  try {
    const { name, phone, lat, lng } = req.body;

    const address = await getAddress(lat, lng);

    const logData = {
      name,
      phone,
      lat,
      lng,
      address,
      time: new Date()
    };

    saveLog(logData);

    console.log("🚨 SOS ALERT:", logData);

    res.json({
      message: "SOS sent successfully",
      address
    });

  } catch (err) {
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});