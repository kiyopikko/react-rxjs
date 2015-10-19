var Rx = require('rx');
var update = require('react/lib/update');

var Intent = require('./intent');

var subject = new Rx.ReplaySubject(1);

var state = {
  counter: 0,
  counterLoaded: false
};


Intent.subjects.loadCounterSubject.subscribe(function (data) {
  state = update(state, {
    $merge: {
      counter: Number(data.counter),
      counterLoaded: true
    }
  });
  subject.onNext(state);
});

Intent.subjects.incrementCounterSubject.subscribe(function (data) {
  state = update(state, {
    $merge: {
      counter: Number(data.counter)
    }
  });
  subject.onNext(state);
});

subject.onNext(state);

module.exports = {
  subject: subject
};
