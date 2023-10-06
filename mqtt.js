const mqtt = require('mqtt');

const config = require('./config');

const topic = config.serverMqtt.topic;
const clientId = `publish-${Math.floor(Math.random() * 1000)}`

var options = {
    port: config.serverMqtt.port,
    clientId: clientId,
    username: config.serverMqtt.username,
    password: config.serverMqtt.password,
  };

const client = mqtt.connect(`mqtt://${config.serverMqtt.broker}:${config.serverMqtt.port}`, options);
const data = []

const runMqtt = () => {
    client.on("connect", () => {
        console.log('Đã kết nối tới máy chủ MQTT');
        client.subscribe(topic, (err) => {
            if (!err) {
                console.log(`Đã đăng ký nhận tin nhắn trên topic "${topic}"`);
            }
        });
        
        client.on("message", (topic, message) => {
            let time = new Date()
            console.log(`Nhận tin nhắn từ topic "${topic}" lúc ${time.toLocaleString()}:\n ${message.toString()}`);
            data.push(message);
        });
        
        client.on('error', (err) => {
            console.error(`Lỗi kết nối: ${err}`);
        });
    });
}

module.exports = {
    runMqtt,
    data
}