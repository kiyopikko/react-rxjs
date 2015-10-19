/**
 * @jsx React.DOM
 */

/*jshint node: true, browser: true, newcap:false*/
'use strict';


var React           = require('react/addons'),
    Rx              = require('rx'),
    CounterActions  = require('../actions/CounterActions'),
    EventHandler    = require('../utils/eventHandler');

var ENDPOINT_URL = '/api/';
var KEY = 'counter';

var MainView = React.createClass({

    getInitialState: function () {
        return {};
    },

    componentWillMount: function () {

        this.props.counterStore.counter
          .subscribe(this.setState.bind(this));

        var incrementBtnClick = EventHandler.create();
        incrementBtnClick
          .subscribe(CounterActions.increment);

        var loadFromJson = EventHandler.create();
        loadFromJson
          .subscribe(CounterActions.load);

        this.handlers = {
          incrementBtnClick: incrementBtnClick,
          loadFromJson: loadFromJson
        };
    },

    componentDidMount: function () {
      // load from json
      $.ajax({
        url: ENDPOINT_URL + KEY,
        dataType: 'json',
        cache: false,
        success: function(data) {
          data.counter = Number(data.counter);
          this.handlers.loadFromJson(data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(ENDPOINT_URL + KEY, status, err.toString());
        }
      });
    },

    render: function () {

      var view = (!this.state.loaded) ? 'Now loading...' :
        <div>
          <h1>Hello</h1>
          <p>counter: {this.state.counter}</p>
          <button onClick={this.handlers.incrementBtnClick}>increment</button>
        </div>;

      return (
        <div>
          {view}
        </div>
      );
    }
});

module.exports = MainView;




