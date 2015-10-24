var Rx = require('rx');
var update = require('react/lib/update');

var Intent = require('./intent');

var subject = new Rx.ReplaySubject(1);

var ds = require('./datastore');

var state = {
  counter: 0,
  counterLoaded: false
};


Intent.subjects.loadCounterSubject.subscribe(function (data) {
  state = update(state, {
    $merge: {
      counter: data.counter,
      counterLoaded: true
    }
  });
  subject.onNext(state);
});

Intent.subjects.receiveCounterSubject.subscribe(function (data) {
  state = update(state, {
    $merge: {
      counter: data.counter
    }
  });
  subject.onNext(state);
});

subject.onNext(state);

module.exports = {
  subject: subject
};
