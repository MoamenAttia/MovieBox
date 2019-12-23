const express = require('express');
const User = require("../Models/User.js");
const moment = require("moment");

const router = new express.Router();

// sign up
router.post("/users", async (req, res) => {
    const user = new User({
        ...req.body,
        birthDate: moment.utc(req.body.birthDate),
    });
    try {
        let createdUser = await user.save();
        res.status(201).send(createdUser);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).send(error);
    }
});

// log in
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username.toLowerCase(), req.body.password);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send({message: e.message});
    }
});


module.exports = router;