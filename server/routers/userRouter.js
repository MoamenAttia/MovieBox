const express = require('express');
const User = require("../Models/User.js");
const moment = require("moment");

const router = new express.Router();

// sign up
router.post("/users", async (req, res) => {
    const user = new User({ ...req.body, birthDate: moment.utc(req.body.birthDate), username: req.body.username.toLowerCase() });
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
        const user = await User.findByCredentials(req.body.username, req.body.password);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;