
const jwt = require('jsonwebtoken');
require('dotenv/config');

let map = new Map();
let mapL = new Map();

function limit (req, res, next) {
    const twk = req.header('Authorization');
    const { _id } = jwt.decode(twk);

    if (map.has(_id)) {
        if (Date.now() - map.get(_id).time < 60000) {
            if (map.get(_id).count > 0) {
                map.get(_id).count--;
                next();
            } else {
                return res.status(429).json({ err: 'Only 10 request are permitted every minute' });
            }
        } else {
            map.get(_id).count = 9;
            map.get(_id).time = Date.now();
            next();
        }
    } else {
        map.set(_id, { count: 9, time: Date.now() });
        next();
    }
}

function limitLogin (req) {

    if (!req.ip) {
        return { code: 400, time: 0};
    }

    const ip = req.ip;

    if (mapL.has(ip)) {
        const t = 30000 * Math.pow(2, mapL.get(ip).attempts);
        if (Date.now() - mapL.get(ip).time < t) {
            if (mapL.get(ip).count > 0) {
                mapL.get(ip).count--;
                return { code: 200, time: 0};
            } else {
                return { code: 429, time: t - (Date.now() - mapL.get(ip).time)};
            }
        } else {
            mapL.get(ip).count = 2;
            mapL.get(ip).time = Date.now();
            mapL.get(ip).attempts++;
            return { code: 200, time: 0};
        }
    } else {
        mapL.set(ip, { count: 2, time: Date.now(), attempts: 0 });
        return { code: 200, time: 0};
    }
}

function resetLimit(ip) {
    if (mapL.has(ip)) {
        mapL.delete(ip);
    }
}

module.exports.limit = limit;
module.exports.limitLogin = limitLogin;
module.exports.resetLimit = resetLimit;