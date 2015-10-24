var Rx = require('rx');

var ENDPOINT = '/api/counter';

var subjects = {
  incrementCounterSubject: new Rx.Subject(),
  loadCounterSubject: new Rx.Subject()
};

module.exports = {
  subjects: subjects,

  incrementCounter: function () {
    subjects.incrementCounterSubject.onNext();
  },

  loadCounter: function () {
    loadCounterFromServer(function(data){
      subjects.loadCounterSubject.onNext(data);
    });
  }
};

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