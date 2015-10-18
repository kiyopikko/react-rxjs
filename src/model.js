var Rx = require('rx');
var update = require('react/lib/update');

var Intent = require('./intent');

var subject = new Rx.ReplaySubject(1);

var ENDPOINT = '/api/counter';

var state = {
  counter: 0,
  counterLoaded: false
};


Intent.subjects.loadCounterSubject.subscribe(function () {
  loadCounterFromServer(function(data){
    state = update(state, {
      $merge: {
        counter: Number(data.counter),
        counterLoaded: true
      }
    });
    subject.onNext(state);
  });
});


Intent.subjects.incrementCounterSubject.subscribe(function () {
  saveCounterToServer({counter: state.counter + 1}, function(data){
    state = update(state, {
      $merge: {
        counter: Number(data.counter)
      }
    });
    subject.onNext(state);
  });
});

subject.onNext(state);

function loadCounterFromServer(callback) {
  $.ajax({
    url: ENDPOINT,
    dataType: 'json',
    cache: false,
    success: function(data) {
      callback(data);
    },
    error: function(xhr, status, err) {
      console.error(ENDPOINT, status, err.toString());
    }
  });
}

function saveCounterToServer(state, callback) {
  $.ajax({
    url: ENDPOINT,
    dataType: 'json',
    type: 'POST',
    data: state,
    success: function(data) {
      callback(data);
    },
    error: function(xhr, status, err) {
      console.error(ENDPOINT, status, err.toString());
    }
  });
}

module.exports = {
  subject: subject
};
