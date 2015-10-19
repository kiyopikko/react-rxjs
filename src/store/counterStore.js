/*jshint node:true*/

var Rx      = require('rx'),
    assign  = require('../utils/assign'),
    store   = require('../utils/store');

// our store expose 2 streams :
// `updates`: that should receive operations to be applied on our list of todo
// `todos`: an observable that will contains our up to date list of todo
function CounterStore(key) {
    this.updates = new Rx.Subject();

    var loadedCounter = Rx.Observable.fromPromise(store.load(key));

    var updateCounter = this.updates
        .scan(function (counter, operation) {
            return operation(counter);
        });

    this.counter = loadedCounter
                    .concat(updateCounter);

    this.key = key;
}



module.exports = CounterStore;