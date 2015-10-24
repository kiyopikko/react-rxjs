var React = require('react');

var Intent = require('../intent');

var ENDPOINT = '/api/counter';

class Root extends React.Component {

  constructor() {
    super();

    this.handleIncrement = () => {
      this.saveCounterToServer({
        counter: this.getCounter() + 1
      }, Intent.incrementCounter);
    }
    this.handleLoad = (data) => {
      Intent.loadCounter(data);
    }

    this.loadCounterFromServer(this.handleLoad);
  }

  getCounter() {
    return this.props.counter;
  }

  loadCounterFromServer(callback) {
    $.ajax({
      url: ENDPOINT,
      dataType: 'json',
      cache: false,
      success: function(data) {
        callback(data);
      },
      error: function(xhr, status, err) {
        console.error(ENDPOINT, status, err.toString());
      }
    });
  }

  saveCounterToServer(data, callback) {
    $.ajax({
      url: ENDPOINT,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(successData) {
        callback(successData);
      },
      error: function(xhr, status, err) {
        console.error(ENDPOINT, status, err.toString());
      }
    });
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
