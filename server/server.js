// server.js
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let str = message.toString();
    console.log('message:', str);
  });

  ws.send('send message to client');
});
