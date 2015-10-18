var Rx = require('rx');

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
    subjects.loadCounterSubject.onNext();
  }
};