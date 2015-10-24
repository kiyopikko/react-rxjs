var Rx = require('rx');

var ENDPOINT = '/api/counter';

var subjects = {
  incrementCounterSubject: new Rx.Subject(),
  loadCounterSubject: new Rx.Subject()
};

module.exports = {
  subjects: subjects,

  incrementCounter: function (data) {
    saveCounterToServer(data, function(data){
      subjects.incrementCounterSubject.onNext(data);
    });
  },

  loadCounter: function (data) {
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

function saveCounterToServer(data, callback) {
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