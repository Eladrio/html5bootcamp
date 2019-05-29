// Creates a new Web Socket.
const socket = new WebSocket('ws://demos.kaazing.com/echo');

// Listens for an open event and sends a message to the server.
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listens for a message from the server and when received logs that message
// in the console.
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});