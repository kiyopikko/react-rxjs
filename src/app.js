/*jshint node:true, browser: true*/

var Rx          = require('rx'),
    React       = require('react/addons'),
    CounterStore   = require('./store/counterStore'),
    CounterActions = require('./actions/CounterActions'),
    MainView    = require('./views/mainView.jsx');


var counterStore = new CounterStore('react-rxjs-todomvc-style');

//register our actions against our store updates stream
CounterActions.register(counterStore.updates);

React.renderComponent(
    MainView({ counterStore: counterStore }),
    document.getElementById('app')
);


