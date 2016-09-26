'use strict'

const express = require('express');
const mongoose = require('mongoose');



const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/meanchat';

app.use(express.static('client'));

app.get('/api/title', (req, res) => {
    res.send({title: 'MEAN Chat'})
})


const Message = mongoose.model('message', {
    author: String, 
    content: String
})



app.get('/api/messages', (req, res, err) => {
    Message.find()
        .then((messages) => {
            res.json({messages})
        })
        .catch(err)
})

mongoose.promise = Promise
mongoose.connect(MONGODB_URL, () => {
    app.listen(PORT, () => {`Listening on port: ${PORT}`});
})
