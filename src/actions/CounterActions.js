/*jshint node : true */

var Rx      = require('rx'),
    assign  = require('../utils/assign');
/**
 * A set of actions that will be exposed into views
 * Thoses actions will trigger model update
 */
var CounterActions = {
  increment: new Rx.Subject(),
  load: new Rx.Subject()
};

/**
 * Register our actions against an updates stream
 * each one of our actions will push operation to apply on the model
 * into the stream.
 */
CounterActions.register = function (updates) {
    this.increment
        .map(function () {
            // ここの引数はViewが渡して来たデータ
            return function (counter) {
                // ここの引数はStoreのデータ
                return assign({}, counter, {counter: counter.counter + 1});
            };
        })
        .subscribe(updates);

    this.load
        .map(function (loadedData) {
            return function (counter) {
                return assign({}, counter, {counter: loadedData.counter, loaded: true});
            };
        })
        .subscribe(updates);
};


module.exports = CounterActions;