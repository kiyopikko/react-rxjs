var React = require('react');

var Intent = require('../intent');

class Root extends React.Component {

  constructor() {
    super();

    this.handleIncrement = () => {
      Intent.incrementCounter({
        counter: this.getCounter() + 1
      });
    }
    this.handleLoad = () => {
      Intent.loadCounter();
    }

    this.handleLoad();
  }

  getCounter() {
    return this.props.counter;
  }

  render() {
    console.log('props', this.props);

    var view = !this.props.counterLoaded ? 'Now loading...' :
        <div>
          <h1>Hello</h1>
          <p>counter: {this.props.counter}</p>
          <button onClick={this.handleIncrement}>increment</button>
        </div>;

    return (
      <div>
        {view}
      </div>
    );
  }
}

module.exports = Root;
