const express = require("express");
const axios = require("axios").default;
const querystring = require("querystring");
const router = new express.Router();
const Movie = require("../Models/Movie.js");
const AssignScreen = require("../Models/AssignScreen.js");
const Screen = require("../Models/Screen.js");

// create movie.
router.post("/movies", async (req, res) => {
  const movie = new Movie(req.body);
  try {
    let newMovie = await movie.save();
    res.status(201).send(newMovie);
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).send(error.message);
  }
});

// get all movies.
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).send(movies);
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).send(error.message);
  }
});

// get movie by id to fetch all details.
router.get("/movies/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const movie = await Movie.findMovieById(_id);
    res.status(200).send(movie);
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).send(error.message);
  }
});

router.get("/movies/:id/available_screens", async (req, res) => {
  try {
    const availableParties = await AssignScreen.findAvailableScreens(
      req.body.day,
      req.body.month,
      req.body.year
    );
    res.status(200).send(availableParties);
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).send(error.message);
  }
});

router.post("/movies/:id/assignscreen", async (req, res) => {
  const seats = [];
  const rows = 10;
  const cols = 10;
  for (let i = 0; i < rows; ++i) {
    seats.push([]);
    for (let j = 0; j < cols; ++j) {
      seats[i].push(0);
    }
  }
  try {
    let screen = new Screen({
      screenNumber: req.body.screenNumber,
      party: req.body.party,
      seats
    });
    let createdScreen = await screen.save();
    const assignscreen = new AssignScreen({
      ...req.body,
      screenId: createdScreen.toObject()._id
    });
    let result = await assignscreen.save();
    res.status(201).send(result);
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).send(error.message);
  }
});

router.post("/movies/:id/screens", async (req, res) => {
  const _id = req.params.id;
  try {
    const activeScreens = await AssignScreen.findScreenForAMovie(
      req.body.day,
      req.body.month,
      req.body.year,
      _id
    );
    res.status(200).send(activeScreens);
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).send(error.message);
  }
});

router.post("/movies/generate_random", async (req, res) => {
  const search = req.body.search;
  axios
    .get(`http://www.omdbapi.com/?apikey=3f08b75d&s=${search}&plot=full`)
    .then(response => {
      response.data.Search.forEach(async object => {
        let result = await axios.get(
          `http://www.omdbapi.com/?apikey=3f08b75d&t=${object.Title}`
        );
        let movie = new Movie({
          title: result.data.Title,
          length: parseInt(result.data.Runtime.split()[0]),
          poster: result.data.Poster,
          genre: result.data.Genre
        });
        await movie.save();
      });
      res.send("Success")
    })
    .catch(error => {
      console.log(JSON.stringify(error));
      res.status(500).send(error.message);
    });
});

module.exports = router;
