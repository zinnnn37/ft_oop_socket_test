import { initWebSocket, checkHeartbeat, socket } from './socket.js';
import { navigate } from './navigate.js';

export default class Test {
  constructor($target) {
    // getMessage();

    socket.onmessage = (e) => {
      if (!checkHeartbeat(e)) {
        const data = JSON.parse(e.data);

        console.log(data.message);
      }
    };

    this.$target = $target;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      initWebSocket();
    }

    this.$target.innerHTML = `<h1>Test</h1><div id='Home'>home</div>`;

    const $test = document.querySelector('#Home');
    $test.addEventListener('click', () => {
      navigate('/');
    });

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'message', message: 'TEST' }));
    }
  }
}
