/*jshint node : true */

var Rx      = require('rx');

/**
 * A set of actions that will be exposed into views
 * Thoses actions will trigger model update
 */
var CounterActions = {
  increment: new Rx.Subject()
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
                return {counter: counter.counter + 1};
            };
        })
        .subscribe(updates);
};


module.exports = CounterActions;