require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./routes');

app.use(bodyParser.json());

app.use('/api', routes);
const port = process.env.PORT || 3001;

app.listen(port, (error) => {
    if (error) {
        console.log('something went wrong while starting the server');
    } else {
        console.log('server started successfully');
    }
});

app.use((error, req, res, next) => {
    res.status(500).json({
        error,
    });
});