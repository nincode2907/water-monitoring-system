const socket = new WebSocket("ws://localhost:3000");
const datasets = []

export function runSocket() {
    socket.addEventListener("open", (event) => {
      console.log("Connected to Socket Server");
    });
    
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log(data.toString());
      datasets.push(data);
    });
    
    socket.addEventListener("close", (event) => {
      console.log("Closed from Socket Server");
    });
}

export {
  runSocket,
  datasets
}
