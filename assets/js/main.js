import chartConfigs from "./chartConfig.js"
import {calculationTimeDiff, animationToChangeValue} from "./methodCal.js"

const iconZoomIn = "open_in_full"
const iconZoomOut= "close-fullscreen"
const gear = document.querySelector('.intro span')
const statusUpdateTimeElement = document.querySelector('.status-updatetime-calcu');

var timeUpdate
var intervalId 
var typeInterval = 'nothing';
const chartQuantityPoint = 16
  
const charts = []
const datasets = {
    wind_speed_km_per_hour: [],
    humidity: [],
    wave_height_in_meter: [],
    water_temperature: [],
    timestamp: []
}
const eventSource = new EventSource('/sse')

eventSource.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    if (datasets.timestamp.length >= chartQuantityPoint) 
        datasets.timestamp.splice(0, 1);
    const time = new Date();
    datasets.timestamp.push(`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`)
    charts.forEach((chart, index) => {
        updateChart(chart, chartConfigs[index], data)
    })
})

function setupChartsData(datasets) {
    chartConfigs.forEach((config) => {
        let ctx = document.getElementById(config.id).getContext("2d");
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
            labels: datasets.timestamp,
            datasets: [
                {
                data: datasets[config.key_object_mqtt],
                label: "Value",
                tension: 0,
                borderWidth: 0,
                pointRadius: 5,
                pointBackgroundColor: "rgba(255, 255, 255, .8)",
                pointBorderColor: "transparent",
                borderColor: "rgba(255, 255, 255, .8)",
                borderColor: "rgba(255, 255, 255, .8)",
                borderWidth: 4,
                borderJoinStyle: "bevel",
                backgroundColor: "transparent",
                fill: false,
                maxBarThickness: 6,
                },
            ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                    display: false,
                    },
                },
                interaction: {
                    intersect: false,
                    mode: "index",
                },
                scales: {
                    y: {
                    title: {
                        display: true,
                        text: "Value",
                        color: "#f8f9fa",
                        font: {
                        size: 16,
                        weight: 300,
                        family: "Roboto",
                        style: "normal",
                        },
                    },
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5],
                        color: "rgba(255, 255, 255, .2)",
                    },
                    ticks: {
                        display: true,
                        color: "#f8f9fa",
                        padding: 10,
                        font: {
                        size: 14,
                        weight: 300,
                        family: "Roboto",
                        style: "normal",
                        lineHeight: 2,
                        },
                    },
                    },
                    x: {
                    title: {
                        display: true,
                        text: "Time",
                        color: "#f8f9fa",
                        font: {
                        size: 16,
                        weight: 300,
                        family: "Roboto",
                        style: "normal",
                        },
                    },
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                        borderDash: [5, 5],
                    },
                    ticks: {
                        display: true,
                        color: "#f8f9fa",
                        padding: 10,
                        font: {
                        size: 10,
                        weight: 300,
                        family: "Roboto",
                        style: "normal",
                        lineHeight: 2,
                        },
                    },
                    },
                },
            },
        });

        charts.push(myChart);
    });
}

function updateChart(myChart, config, newInformation) {
    let temp = myChart.data.datasets[0].data;
    if (temp.length >= chartQuantityPoint) 
        temp.splice(0, 1);
    temp.push(newInformation[config.key_object_mqtt]);
    myChart.data.labels = datasets.timestamp;
    myChart.data.datasets[0].data = temp;
    myChart.update();
    updateStatusUpdateTime();
    updateSensorInformation(newInformation);
}

function updateSensorInformation(newInformation) {
    animationToChangeValue(document.querySelector('.status_infomation .status_humidity .value'), newInformation.humidity)
    animationToChangeValue(document.querySelector('.status_infomation .status_temperature .value'), newInformation.water_temperature);
    animationToChangeValue(document.querySelector('.status_infomation .status_wind-speed .value'), newInformation.wind_speed_km_per_hour)
    animationToChangeValue(document.querySelector('.status_infomation .status_wave-height .value'), newInformation.wave_height_in_meter);
    timeUpdate = (newInformation.timestamp) ? new Date(newInformation.timestamp) : new Date()
    document.querySelector('.status-sent-datetime').innerHTML = timeUpdate.toLocaleString()
}

setTimeout(() =>{
    gear.style.opacity = "0"
    setTimeout(() =>{
        document.querySelector('.intro').style.display = "none";
    },1000);
    fetch(`/data?quantity=${chartQuantityPoint}`)
    .then((response) => response.json())
    .then((data) => {
        data[0].reverse().forEach((item) => {
            datasets.humidity.push(item.humidity);
            datasets.water_temperature.push(item.water_temperature);
            datasets.wind_speed_km_per_hour.push(item.wind_speed_km_per_hour);
            datasets.wave_height_in_meter.push(item.wave_height_in_meter);
            const time = new Date(item.timestamp);
            const hours = time.getHours().toString().padStart(2, '0');
            const minutes = time.getMinutes().toString().padStart(2, '0');
            datasets.timestamp.push(`${hours}: ${minutes}`);
        })
        timeUpdate = new Date(data[0][data[0].length-1].timestamp);
        updateStatusUpdateTime()
        updateSensorInformation(data[0][data[0].length-1])
        return;
    })
    .then(() => setupChartsData(datasets))
    .catch((err) => console.log('Have an error: ' + err))
}, 4500)

function updateStatusUpdateTime() {
    let timeDiff = calculationTimeDiff(timeUpdate);
    statusUpdateTimeElement.textContent = timeDiff
    if(!timeDiff.includes(typeInterval))
        startUpdatingStatusUpdateTime(timeDiff)
}

function startUpdatingStatusUpdateTime(timeDiff) {
    const intervals = {
      seconds: 1000,
      minutes: 60000,
      hours: 3600000,
      days: 86400000,
      months: 2592000000,
      years: 31536000000,
    };

    for (const unit in intervals) {
        if (timeDiff.includes(unit) && typeInterval !== unit) {
            clearInterval(intervalId);
            intervalId = setInterval(updateStatusUpdateTime, intervals[unit]);
            typeInterval = unit;
            break;
        }
    }
  }
  