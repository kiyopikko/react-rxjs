var React = require('react');

var Intent = require('../intent');

class Root extends React.Component {

  constructor() {
    super();

    this.handlers = {
      increment: () => Intent.incrementCounter({counter: this.getCounter()}),
      load: () => Intent.loadCounter(),
      watch: () => Intent.watchCounter()
    }

    this.handlers.load();
    this.handlers.watch();
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
