let socket = null;
let heartbeatInterval = null;

function initWebSocket() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    socket = new WebSocket('ws://localhost:3000');
  }

  socket.onopen = () => {
    console.log('Connected to the server');

    heartbeatInterval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'heartbeat', message: 'ping' }));
      }
    }, 10000);
  };

  socket.onclose = () => {
    console.log('Disconnected from the server');
  };
}

function checkHeartbeat(e) {
  const data = JSON.parse(e.data);

  if (data.type === 'heartbeat') {
    console.log('Pong: Received pong from the server');

    return true;
  }
  return false;
}

initWebSocket();

export { initWebSocket, checkHeartbeat, socket };
