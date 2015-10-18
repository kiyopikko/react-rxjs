var React = require('react');

var Intent = require('../intent');

class Root extends React.Component {

  constructor() {
    super();

    this.handleIncrement = function () {
      Intent.incrementCounter();
    }
    this.handleLoad = function () {
      Intent.loadCounter();
    }

    this.handleLoad();
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
