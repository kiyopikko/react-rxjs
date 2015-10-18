var React = require('react');

var Intent = require('../intent');

var ds = require('../datastore');

const KEY = 'INCREMENT_COUNTER';

class Root extends React.Component {

  constructor() {
    super();

    this.handlers = {
      increment: () => Intent.incrementCounter(),
      load: (value) => Intent.loadCounter(value),
      receive: (value) => Intent.receiveCounter(value)
    }

  }

  componentDidMount() {
    // load data from milkcocoa
    ds.get(KEY, (err, datum) => {
      if(err){
        if(err === 'not found'){
          var initialCounter = {counter: 0};
          ds.set(KEY, initialCounter);
          this.handlers.load(initialCounter);
        }else{
          console.error(err);
        }
        return;
      }
      this.handlers.load(datum.value);
    });

    // message comes from milkcocoa
    ds.on('set', (setted) => {
      switch(setted.id){
        case KEY:
          this.handlers.receive(setted.value);
          break;
        default:
          console.error('Not registered action');
      }
    });
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
