/**
 * @jsx React.DOM
 */

/*jshint node: true, browser: true, newcap:false*/
'use strict';


var React           = require('react/addons'),
    Rx              = require('rx'),
    CounterActions  = require('../actions/CounterActions'),
    EventHandler    = require('../utils/eventHandler');


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

        this.handlers = {
          incrementBtnClick: incrementBtnClick
        };
    },

    render: function () {
      return (
        <div>
          <h1>Hello</h1>
          <p>counter: {this.state.counter}</p>
          <button onClick={this.handlers.incrementBtnClick}>increment</button>
        </div>
      );
    }
});

module.exports = MainView;




