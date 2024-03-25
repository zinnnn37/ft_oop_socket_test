import { initWebSocket, socket } from './socket.js';
import { navigate } from './navigate.js';

export default class Home {
  constructor($target) {
    this.$target = $target;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      initWebSocket();
    }

    console.log('Home');

    this.$target.innerHTML = `<h1>Home</h1><div id='test'>test</div>`;

    const $test = document.querySelector('#test');
    $test.addEventListener('click', () => {
      navigate('/test');
    });

    socket.send('HOME');
  }
}
