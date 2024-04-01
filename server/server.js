// server.js
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

const clients = [];

wss.on('connection', function connection(ws, req) {
  clients.push(ws);

  ws.on('message', function incoming(message) {
    let str = message.toString();
    console.log('message:', str);
    broadcast('message from server');
  });
});

function broadcast(msg) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}
