var React = require('react');

var Intent = require('../intent');

class Root extends React.Component {

  constructor() {
    super();

    this.handlers = {
      load: Intent.loadCounter,
      increment: Intent.incrementCounter
    }

    this.handlers.load();
  }

  render() {
    console.log('props', this.props);

    var view = !this.props.counterLoaded ? 'Now loading...' :
        <div>
          <h1>Hello</h1>
          <p>counter: {this.props.counter}</p>
          <button onClick={this.handlers.increment}>increment</button>
        </div>;

    return (
      <div>
        {view}
      </div>
    );
  }
}

module.exports = Root;
