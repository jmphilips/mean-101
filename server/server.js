'use strict'

const express = require('express');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const { Server } = require('http');
const socketio = require('socket.io');

const app = express();
const server = Server(app);
const io = socketio(server);


const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/meanchat';

app.use(express.static('client'));
app.use(json())

app.get('/api/title', (req, res) => {
    res.send({title: 'MEAN Chat'})
})


const Message = mongoose.model('message', {
    author: String, 
    content: String
})


app.get('/api/messages', (req, res, err) => {
    Message
        .find()
        .then((messages) => {res.json({messages})})
        .catch(err)
})

app.post('/api/messages', (req, res, err) => {
    const msg = req.body

    Message
        .create(msg)
        .then(msg => res.json(msg))
        .catch(err)
})

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () => {
    server.listen(PORT, () => {`Listening on port: ${PORT}`});
})


io.on('connection', socket => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('disconnect', () => console.log(`Socket disconnected: ${socket.id}`)); 
})