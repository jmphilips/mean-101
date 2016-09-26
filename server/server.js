'use strict'

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('client'));

app.get('/api/title', (req, res) => {
    res.send({title: 'MEAN 101 from Node'})
})

app.listen(port, () => {`Listening on port: ${port}`});