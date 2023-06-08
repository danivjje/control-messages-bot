const express = require('express');
const server = express();

server.all('/', (req, res) => {
    res.send('bot is starting');
});

function keepAlive() {
    server.listen(3000, () => {
        console.log('ready');
    });
};

module.exports = keepAlive;