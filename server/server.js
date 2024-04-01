// server.js
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws, req) {
  ws.on('message', function incoming(message) {
    let str = message.toString();
    console.log('message:', str);
  });

  if (ws.readyState !== ws.OPEN) {
    console.log('not open');
  }

  ws.interval = setInterval(() => {
    //3초마다 클라이언트로 메시지 전송
    if (ws.readyState === ws.OPEN) {
      ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
    }
  }, 3000);
});
