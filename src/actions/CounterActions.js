/*jshint node : true */

var Rx      = require('rx'),
    assign  = require('../utils/assign');
/**
 * A set of actions that will be exposed into views
 * Thoses actions will trigger model update
 */
var CounterActions = {
  load: new Rx.Subject(),
  receive: new Rx.Subject()
};

/**
 * Register our actions against an updates stream
 * each one of our actions will push operation to apply on the model
 * into the stream.
 */
CounterActions.register = function (updates) {

    this.load
        .map(function (loadedData) {
            return function (counter) {
                return assign({}, counter, {counter: loadedData.counter, loaded: true});
            };
        })
        .subscribe(updates);

    this.receive
        .map(function (receivedData) {
            return function (counter) {
                return assign({}, counter, {counter: receivedData.counter});
            };
        })
        .subscribe(updates);

};


module.exports = CounterActions;