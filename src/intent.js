var Rx = require('rx');

var subjects = {
  incrementCounterSubject: new Rx.Subject(),
  loadCounterSubject: new Rx.Subject()
};

module.exports = {
  subjects: subjects,

  incrementCounter: function (data) {
    subjects.incrementCounterSubject.onNext(data);
  },

  loadCounter: function (data) {
    subjects.loadCounterSubject.onNext(data);
  }
};