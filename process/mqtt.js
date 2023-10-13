const mqtt = require('mqtt');
const { Readable } = require('stream');

const config = require('./config');
const {addData} = require('./controller')

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

function sendSseMessage(data) {
    const sseFormattedData = `data: ${data}\n\n`;
    sseStream.push(sseFormattedData);
}

function formatMessage(message) {
  const keyValuePairs = message.replace('station1:', '').split(',').map(pair => pair.trim());
  const formattedObject = {};

  keyValuePairs.forEach(pair => {
    const [key, value] = pair.split('=').map(item => item.trim());
    formattedObject[key] = isNaN(value) ? value : parseFloat(value);
  });

  return JSON.stringify(formattedObject);
}

const sseStream = new Readable();
sseStream._read = () => {};

function generateRandomWeatherData(stationName) {
    const airTemperature = Math.floor(Math.random() * 50); 
    const windSpeed = Math.floor(Math.random() * 50); 
    const humidity = Math.floor(Math.random() * 100); //
    const waveHeight = Math.random() * 5; 
    const waterTemperature = Math.floor(Math.random() * 40); 
    const uvIndex = Math.floor(Math.random() * 11); 
  
    const weatherData = `${stationName}: air_temperature = ${airTemperature}, wind_speed_km_per_hour = ${windSpeed}, humidity = ${humidity}, wave_height_in_meter = ${waveHeight.toFixed(1)}, water_temperature = ${waterTemperature}, UV_index = ${uvIndex}`;
    
    return weatherData;
  }

// setInterval(() => {
//     let mes = generateRandomWeatherData("station1")
//     addData(JSON.parse(formatMessage(mes)));
//     sendSseMessage(formatMessage(mes));
// },15000)

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
            console.log(`Nhận tin nhắn từ topic "${topic}" lúc ${time.toLocaleString()}:\n ${message}`);
            let formattedObject = formatMessage(message.toString());
            sendSseMessage(formattedObject);
            addData(JSON.parse(formattedObject))
        });
        
        client.on('error', (err) => {
            console.error(`Lỗi kết nối: ${err}`);
        });
    });
}

module.exports = {
    runMqtt,
    data,
    sseStream
}