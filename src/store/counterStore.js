/*jshint node:true*/

var Rx      = require('rx'),
    assign  = require('../utils/assign');

// our store expose 2 streams :
// `updates`: that should receive operations to be applied on our list of todo
// `todos`: an observable that will contains our up to date list of todo
function CounterStore() {
    this.updates = new Rx.BehaviorSubject({counter: 0});

    this.counter = this.updates
        .scan(function (counter, operation) {
            return operation(counter);
        });
}



module.exports = CounterStore;