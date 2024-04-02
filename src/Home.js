import { initWebSocket, checkHeartbeat, socket } from './socket.js';
import { navigate } from './navigate.js';

export default class Home {
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

    this.$target.innerHTML = `<h1>Home</h1><div id='test'>test</div>`;

    const $test = document.querySelector('#test');
    $test.addEventListener('click', () => {
      navigate('/test');
    });

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'message', message: 'HOME' }));
    }
  }
}
