const express = require('express');
const router = new express.Router();
const Screen = require("../Models/Screen.js");


router.get("/screens/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        let screen = await Screen.findOne({ _id });
        res.status(200).send(screen);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).send(error.message);
    }
})

// reserve
router.post("/screens/:id", async (req, res) => {
    // TODO => UserID Missing, Return the ticket also.
    const _id = req.params.id;
    try {
        const row = req.body.row;
        const col = req.body.col;
        const screen = await Screen.find({ _id });
        if (screen.seats[row][col]) {
            res.status(403).send({ message: "Already Reserved", seats: screen.seats });
        }
        res.status(201).send("Reserved Successfully");
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).send(error.message);
    }
})

module.exports = router;