const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const request = require('request-promise-native');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

let raceObject = {};

getRaceData = function() {
  return request({
    method: 'GET',
    uri: 'http://ergast.com/api/f1/current/last/results.json',
  }).then(function(response) {
    let raceData = JSON.parse(response);
    let latestRace = raceData.MRData.RaceTable.Races[0];
    raceObject.raceName = latestRace.raceName;
    raceObject.circuitName = latestRace.Circuit.circuitName;
    raceObject.locationCity = latestRace.Circuit.Location.locality;
    raceObject.locationCountry = latestRace.Circuit.Location.country;
    raceObject.lastDate = latestRace.date;
    raceObject.drivers = latestRace.Results;
    raceObject.first = latestRace.Results[0];
    raceObject.second = latestRace.Results[1];
    raceObject.third = latestRace.Results[2];

    return
  })
};
getQualsData = function() {
  return request({
    method: 'GET',
    uri: 'https://ergast.com/api/f1/current/last/qualifying.json',
  }).then(function(response) {
    let raceData = JSON.parse(response);
    let latestRace = raceData.MRData.RaceTable.Races[0];
    let poleFirst = latestRace.QualifyingResults[0].Driver.givenName;
    let poleLast = latestRace.QualifyingResults[0].Driver.familyName;
    raceObject.polesitter = poleFirst + " " + poleLast;
    raceObject.qualReults = latestRace.QualifyingResults;

  })
};
getFastestLap = function() {
  return request({
    method: 'GET',
    uri: 'http://ergast.com/api/f1/current/last/fastest/1/results.json',
  }).then(function(response) {
    let raceData = JSON.parse(response);
    let latestRace = raceData.MRData.RaceTable.Races[0];
    let racer = latestRace.Results[0];
    let firstName = racer.Driver.givenName,
        lastName = racer.Driver.familyName,
        speedUnit = racer.FastestLap.AverageSpeed.units,
        avgSpeed = racer.FastestLap.AverageSpeed.speed;
    raceObject.fastestLapHolder = firstName + " " + lastName;
    raceObject.fastestLapTime = racer.FastestLap.Time.time;
    raceObject.fastestLap = racer.FastestLap.lap;
    raceObject.avgSpeed = avgSpeed + " " + speedUnit;
    raceObject.fastLapConstructor = racer.Constructor.name;
    return
  })
};

app.get('/posts', (req, res) => {
  return getRaceData()
    .then(getFastestLap())
    .then(getQualsData())
    .then(function (){
      res.send({
        raceName : raceObject.raceName,
        circuitName : raceObject.circuitName,
        locationCity : raceObject.locationCity,
        locationCountry : raceObject.locationCountry,
        lastDate : raceObject.lastDate,
        drivers : raceObject.drivers,
        first : raceObject.first,
        second : raceObject.second,
        third : raceObject.third,
        fastestLapHolder : raceObject.fastestLapHolder,
        fastestLapTime : raceObject.fastestLapTime,
        fastestLap : raceObject.fastestLap,
        avgSpeed : raceObject.avgSpeed,
        fastLapConstructor : raceObject.fastLapConstructor,
        polesitter : raceObject.polesitter,
        qualReults : raceObject.qualReults,
      })
    })
})

app.listen(process.env.PORT || 8081)
