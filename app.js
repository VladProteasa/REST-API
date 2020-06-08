
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/router');
const auth = require('./login/auth');

require('dotenv/config');

app.use(cors());
app.use(express.json());

app.use('/api/products', router);
app.use('/api/user', auth);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API.' +
        'You will first need to login on /api/login to access the catalog.'});
});

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB')
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`We are online on port ${port}!`));