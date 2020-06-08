
const jwt = require('jsonwebtoken');
require('dotenv/config');

function login (req, res, next) {
    const twk = req.header('Authorization');
    if (!twk) {
        return res.status(401).send('Access denied');
    }
    try{
        const check = jwt.verify(twk, process.env.JWT_KEY);
        req.user = check;
        next();
    } catch (e) {
        res.status(400).send('Token is invalid');
    }
}

module.exports = login;