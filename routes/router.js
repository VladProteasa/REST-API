
const express = require('express');
const router = express.Router();
const utils = require('../utils');
const Model = require('../model/Model');
const login = require('../login/Verify');
const limit = require('../ratelimit/limit');

router.get('/', login, limit.limit, async (req, res) => {
    try {
        const models = await Model.find();
        res.json(models);
    } catch (e) {
        res.json({ error: e });
    }
});

router.get('/:id', login, limit.limit, async (req, res) => {
    try {
        const product = await Model.findById(req.params.id);
        res.json(product);
    } catch (e) {
        res.status(404).json({ error: 'Product not found' });
    }
});

router.post('/', login, limit.limit, async (req, res) => {
    const check = utils.badRequest(req.body);
    if (check) {
        res.status(400).send(check);
        return;
    }

    const model = new Model({
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category,
        createdDate: utils.getTime(),
        updatedDate: utils.getTime()
    });

    try{
        const saved = await model.save();
        res.json(saved);
    } catch (e) {
        res.json({ error: e });
    }

});

router.put('/:id', login, limit.limit, async (req, res) => {
    const check = badRequest(req.body);
    if (check) {
        return req.status(400).send(check);
    }
    try {
        const product = await Model.updateOne({ _id: req.params.id },
            { $set: { name: req.body.title,
                    price: parseInt(req.body.price),
                    category: req.body.category,
                    updatedDate: utils.getTime()
                }});
        res.json(product);
    } catch (e) {
        res.json({ message: e });
    }
});

router.delete('/:id', login, limit.limit, async (req, res) => {
    try {
        const product = await Model.deleteOne({ _id: req.params.id });
        res.json(product);
    } catch (e) {
        res.json({ message: e });
    }
});

module.exports = router;
