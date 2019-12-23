const express = require('express');
const auth = require('../middleware/auth.js');
const jwt = require("jsonwebtoken");
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
        const token = await createdUser.generateAuthToken();
        res.status(201).send({user: createdUser, token});
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).send(error);
    }
});

// log in
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username.toLowerCase(), req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({user, token});
    } catch (e) {
        res.status(400).send({message: e.message});
    }
});

// logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// who am i
router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});


module.exports = router;