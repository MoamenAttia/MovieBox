const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const router = new express.Router();
const Movie = require("../Models/Movie.js");
const AssignScreen = require("../Models/AssignScreen.js");
const Screen = require("../Models/Screen.js");
const auth = require("../middleware/auth.js");

// create movie.
router.post("/movies", auth, async (req, res) => {
    if (req.user.type !== 'admin') {
        res.send(403).send({message: "Admin Only!!"});
    }
    const movie = new Movie(req.body);
    try {
        let newMovie = await movie.save();
        res.status(201).send(newMovie);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/movies/:id", auth, async (req, res) => {
    if (req.user.type !== 'admin') {
        res.send(403).send({message: "Admin Only!!"});
    }
    try {
        let newMovie = await Movie.findOne({_id: req.params.id});
        await newMovie.remove();
        res.status(200).send(newMovie);
    } catch (error) {
        res.status(400).send(error);
    }
});

// get all movies.
router.get("/movies", auth, async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).send(movies);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).send(error.message);
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
        res.status(400).send(error.message);
    }
});

router.get("/movies/:id/available_screens", auth, async (req, res) => {
    if (req.user.type !== 'admin') {
        res.send(403).send({message: "Admin Only!!"});
    }
    const {day, month, year} = req.query;
    try {
        const availableParties = await AssignScreen.findAvailableScreens(day, month, year);
        res.status(200).send(availableParties);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).send(error.message);
    }
});

router.post("/movies/:id/assignscreen", auth, async (req, res) => {
    if (req.user.type !== 'admin') {
        res.send(403).send({message: "Admin Only!!"});
    }
    const seats = [];
    const rows = 12;
    const cols = 12;
    for (let i = 0; i < rows; ++i) {
        seats.push([]);
        for (let j = 0; j < cols; ++j) {
            seats[i].push(0);
        }
    }
    try {
        let screen = new Screen({screenNumber: req.body.screenNumber, party: req.body.party, seats});
        let createdScreen = await screen.save();
        const assignscreen = new AssignScreen({...req.body, screenId: createdScreen.toObject()._id});
        let result = await assignscreen.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).send(error.message);
    }
});

router.get("/movies/:id/screens", auth, async (req, res) => {
    const id = req.params.id;
    const {day, month, year} = req.query;
    try {
        const activeScreens = await AssignScreen.findScreenForAMovie(day, month, year, id);
        res.status(200).send(activeScreens);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).send(error.message);
    }
});

router.post("/movies/generate_random", async (req, res) => {
    const search = req.body.search;
    axios
        .get(`http://www.omdbapi.com/?apikey=3f08b75d&s=${search}&plot=full`)
        .then(response => {
            response.data.Search.forEach(async object => {
                let result = await axios.get(`http://www.omdbapi.com/?apikey=3f08b75d&t=${object.Title}`);
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
