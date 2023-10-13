const express = require('express');
const path = require('path');

const config = require('./process/config');
const { 
    runMqtt,
    data,
    sseStream
} = require('./process/mqtt');
const {getData} = require('./process/controller');

const app = express();
const port = config.serverSystem.port || 3000;
const server = app.listen(port, () => console.log("listening on port http://localhost:" + port))

app.use('/assets', express.static(path.join(__dirname, 'assets')));

runMqtt();

// setInterval(() => {
//     let time = new Date()
//     console.log(`Kiểm tra server vào lúc ${time.toLocaleString()}`);
// },60000)

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/data', getData);

app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    sseStream.pipe(res);
  });
