// server.js
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

const clients = [];

wss.on('connection', function connection(ws, req) {
  clients.push(ws);

  ws.on('message', function incoming(message) {
    let data = JSON.parse(message);
    console.log('type:', data.type, 'message:', data.message);

    if (data.type === 'message') {
      broadcast({ type: 'message', message: 'message from server' });
    } else if (data.type == 'heartbeat') {
      ws.send(JSON.stringify({ type: 'heartbeat', message: 'pong' }));
    }
  });

  ws.on('close', function close() {
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });
});

function broadcast(msg) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'message', message: msg.message }));
    }
  });
}
