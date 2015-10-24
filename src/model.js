var Rx = require('rx');
var update = require('react/lib/update');

var Intent = require('./intent');

var subject = new Rx.ReplaySubject(1);

var ENDPOINT = '/api/counter';

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

Intent.subjects.incrementCounterSubject.subscribe(function () {
  state = update(state, {
    $merge: {
      counter: state.counter + 1
    }
  });
  subject.onNext(state);
  saveCounterToServer({counter: state.counter});
});

subject.onNext(state);

module.exports = {
  subject: subject
};

function saveCounterToServer(data, callback) {

  callback = callback || function () {};

  $.ajax({
    url: ENDPOINT,
    dataType: 'json',
    type: 'POST',
    data: data,
    success: function(successData) {
      callback(successData);
    },
    error: function(xhr, status, err) {
      console.error(ENDPOINT, status, err.toString());
    }
  });
}