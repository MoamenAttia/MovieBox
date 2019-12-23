const express = require('express');
const router = new express.Router();
const Screen = require("../Models/Screen.js");
const User = require("../Models/User.js");
const auth = require("../middleware/auth.js");

router.get("/screens/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try {
        let screen = await Screen.findOne({_id});
        res.status(200).send(screen);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).send(error.message);
    }
});

// reserve
router.post("/screens/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const {userId, row, col} = req.body;
        let screen = await Screen.findOne({_id});
        let currentUser = await User.findOne({_id: userId});
        let mySeat = 0;
        currentUser.tickets.forEach(ticket => {
            if (ticket.screenId === _id && ticket.row === row && ticket.col === col) {
                mySeat = 1;
            }
        });
        if (screen.seats[row][col] && !mySeat) {
            return res.status(403).send({message: "Already Reserved", seats: screen.seats});
        }
        if (screen.seats[row][col] && mySeat) {
            const rowSeats = screen.seats[row];
            rowSeats[col] = 0;
            screen.seats.set(row, rowSeats);
            screen = await screen.save();
            let tickets = currentUser.tickets;
            tickets = tickets.filter(ticket => !(ticket.col === col && ticket.row === row && ticket.screenId === _id));
            currentUser.tickets = tickets;
            currentUser = await currentUser.save();
            return res.status(201).send({screen, user: currentUser});
        } else {
            const rowSeats = screen.seats[row];
            rowSeats[col] = 1;
            screen.seats.set(row, rowSeats);
            screen = await screen.save();
            currentUser.tickets.push({row, col, screenId: _id});
            currentUser = await currentUser.save();
            return res.status(201).send({screen, user: currentUser});
        }
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).send(error.message);
    }
});

module.exports = router;