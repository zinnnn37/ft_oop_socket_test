export default class NotFound {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
  }

  render() {
    console.log('not found');
    this.$target.innerHTML = `<h1>Not Found</h1>`;
  }
}
