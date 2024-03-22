import { socket } from './socket.js';

export default class Home {
  constructor($target) {
    this.$target = $target;
    console.log('Home');
    this.$target.innerHTML = `<h1>Home</h2>`;
    console.log(socket);

    socket.send('Hello');
  }
}
