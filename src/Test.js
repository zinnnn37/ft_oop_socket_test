import { initWebSocket, getMessage, socket } from './socket.js';
import { navigate } from './navigate.js';

export default class Test {
  constructor($target) {
    // getMessage();

    socket.onmessage = (e) => {
      console.log(e);
    };

    this.$target = $target;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      initWebSocket();
    }

    console.log('Test');

    this.$target.innerHTML = `<h1>Test</h1><div id='Home'>home</div>`;

    const $test = document.querySelector('#Home');
    $test.addEventListener('click', () => {
      navigate('/');
    });

    socket.send('TEST');
  }
}
