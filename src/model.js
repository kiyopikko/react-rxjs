var Rx = require('rx');
var update = require('react/lib/update');

var Intent = require('./intent');

var subject = new Rx.ReplaySubject(1);

var ENDPOINT = '/api/counter';

var state = {
  counter: 0
};

loadCounterFromServer(function(data){
  state = {
    counter: Number(data.counter)
  }
  subject.onNext(state);
});


Intent.subjects.incrementCounterSubject.subscribe(function () {
  state = update(state, {
    $merge: {
      counter: state.counter + 1
    }
  });
  saveCounterToServer(state, function(data){
    data.counter = Number(data.counter);
    subject.onNext(data);
  });
});



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
