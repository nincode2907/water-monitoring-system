// Mảng chứa thông tin cấu hình của các biểu đồ
// import chartConfigs from "./chartConfig.js"
// import {calculationTimeDiff} from "./methodCal.js"
// import {runSocket, datasets} from "./socket.js"

// const iconZoomIn = "open_in_full"
// const iconZoomOut= "close-fullscreen"
// const gear = document.querySelector('.intro span')

// runSocket();

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const values = [
    60,34,232,56,33,44,77,22,55,77,23,456
  ]
  

function updateChart(myChart, config) {
    setInterval(() => {
        if (myChart.data.datasets[0].data.length > 17) {
            myChart.data.labels.shift();
            myChart.data.datasets[0].data.shift();
        }
        let ranNum = Math.floor(Math.random() * 10);
        myChart.data.datasets[0].data.push(values[ranNum]);
        myChart.data.labels.push(months[ranNum]);
        myChart.update();

        config.timeUpdate = new Date();
    }, config.interval);
}

module.exports = {
    updateChart
};

// setTimeout(() =>{
//     gear.style.opacity = "0"
//     chartConfigs.forEach((config) => {
//         const ctx = document.getElementById(config.id).getContext("2d");
//         const myChart = new Chart(ctx, {
//             type: "line",
//             data: {
//             labels: [],
//             datasets: [
//                 {
//                 label: "month",
//                 tension: 0,
//                 borderWidth: 0,
//                 pointRadius: 5,
//                 pointBackgroundColor: "rgba(255, 255, 255, .8)",
//                 pointBorderColor: "transparent",
//                 borderColor: "rgba(255, 255, 255, .8)",
//                 borderColor: "rgba(255, 255, 255, .8)",
//                 borderWidth: 4,
//                 borderJoinStyle: "bevel",
//                 backgroundColor: "transparent",
//                 fill: false,
//                 data: config.data,
//                 maxBarThickness: 6,
//                 },
//             ],
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                     display: false,
//                     },
//                 },
//                 interaction: {
//                     intersect: false,
//                     mode: "index",
//                 },
//                 scales: {
//                     y: {
//                     title: {
//                         display: true,
//                         text: "Giá trị",
//                         color: "#f8f9fa",
//                         font: {
//                         size: 16,
//                         weight: 300,
//                         family: "Roboto",
//                         style: "normal",
//                         },
//                     },
//                     grid: {
//                         drawBorder: false,
//                         display: true,
//                         drawOnChartArea: true,
//                         drawTicks: false,
//                         borderDash: [5, 5],
//                         color: "rgba(255, 255, 255, .2)",
//                     },
//                     ticks: {
//                         display: true,
//                         color: "#f8f9fa",
//                         padding: 10,
//                         font: {
//                         size: 14,
//                         weight: 300,
//                         family: "Roboto",
//                         style: "normal",
//                         lineHeight: 2,
//                         },
//                     },
//                     },
//                     x: {
//                     title: {
//                         display: true,
//                         text: "Month",
//                         color: "#f8f9fa",
//                         font: {
//                         size: 16,
//                         weight: 300,
//                         family: "Roboto",
//                         style: "normal",
//                         },
//                     },
//                     grid: {
//                         drawBorder: false,
//                         display: false,
//                         drawOnChartArea: false,
//                         drawTicks: false,
//                         borderDash: [5, 5],
//                     },
//                     ticks: {
//                         display: true,
//                         color: "#f8f9fa",
//                         padding: 10,
//                         font: {
//                         size: 14,
//                         weight: 300,
//                         family: "Roboto",
//                         style: "normal",
//                         lineHeight: 2,
//                         },
//                     },
//                     },
//                 },
//             },
//         });
//         updateChart(myChart, config);
//     });
//     setInterval(() => {
//         chartConfigs.forEach(config => {
//             let timeDiff = calculationTimeDiff(config.timeUpdate);
//             document.querySelector(`.${config.classSensor} .sensor-updatetime-calcu`).innerHTML = timeDiff
//         })
//     }, 1000);
// }, 4500)