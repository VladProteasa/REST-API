
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');
const bcrypt = require('bcrypt');
const limit = require('../ratelimit/limit');
require('dotenv/config');

router.post('/register', async (req, res) => {
    if (!req.body.username) {
        return res.status(400).send('Username is missing');
    } else {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(404).send('Username already exists');
        }
    }
    if (!req.body.password) {
        return res.status(400).send('Password is missing');
    }
    if (!req.body.email) {
        return res.status(400).send('Email is missing');
    } else {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).send('Email already in use');
        }
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const user = new User ({
        username: req.body.username,
        password: hashed,
        email: req.body.email
    });

    try{
        const saved = await user.save();
        res.json( { username: user.username });
    } catch (e) {
        res.json({message: e });
    }

});

router.post('/login', async (req, res) => {

    if (!req.body.email) {
        return res.status(400).send('Email is missing');
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('There is no user with this email');
    }

    const { code, time } = limit.limitLogin(req);
    if (code !== 200) {
        return res.status(code).json( { time: time });
    }

    const check = await bcrypt.compare(req.body.password, user.password);

    if (check) {
        limit.resetLimit(req.ip);
        const twk = jwt.sign({ _id: user._id },
            process.env.JWT_KEY,
            { expiresIn: '1h' });
        res.cookie('authentication', twk);
        res.json({twk: twk });
    } else {
        res.status(400).send('Invalid password');
    }
});

module.exports = router;