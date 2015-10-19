/**
 * @jsx React.DOM
 */

/*jshint node: true, browser: true, newcap:false*/
'use strict';


var React           = require('react/addons'),
    Rx              = require('rx'),
    CounterActions  = require('../actions/CounterActions'),
    EventHandler    = require('../utils/eventHandler'),
    ds              = require('../utils/datastore');

var KEY = 'INCREMENT_COUNTER';

var MainView = React.createClass({

    getInitialState: function () {
        return {};
    },

    componentWillMount: function () {

        this.props.counterStore.counter
          .subscribe(this.setState.bind(this));

        var incrementBtnClick = EventHandler.create();
        incrementBtnClick
          .subscribe(function(){
            ds.set(KEY, {counter: this.state.counter + 1});
          }.bind(this));

        var loadFromMilkcocoa = EventHandler.create();
        loadFromMilkcocoa
          .subscribe(CounterActions.load);

        var receiveFromMilkcocoa = EventHandler.create();
        receiveFromMilkcocoa
          .subscribe(CounterActions.receive);

        this.handlers = {
          incrementBtnClick: incrementBtnClick,
          loadFromMilkcocoa: loadFromMilkcocoa,
          receiveFromMilkcocoa: receiveFromMilkcocoa
        };
    },

    componentDidMount: function () {
      // load from milkcocoa
      ds.get(KEY, function (err, datum) {
        if(err){
          if(err === 'not found'){
            var initialCounter = {counter: 0};
            ds.set(KEY, initialCounter);
            this.handlers.loadFromMilkcocoa(initialCounter);
          }else{
            console.error(err);
          }
          return;
        }
        this.handlers.loadFromMilkcocoa(datum.value);
      }.bind(this));

      // message comes from milkcocoa
      ds.on('set', function (setted) {
        switch(setted.id){
          case KEY:
            this.handlers.receiveFromMilkcocoa(setted.value);
            break;
          default:
            console.error('Not registered action');
        }
      }.bind(this));
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




