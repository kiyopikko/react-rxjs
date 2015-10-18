var Rx = require('rx');

var subjects = {
  incrementCounterSubject: new Rx.Subject(),
  loadCounterSubject: new Rx.Subject(),
  receiveCounterSubject: new Rx.Subject()
};

module.exports = {
  subjects: subjects,

  incrementCounter: function () {
    subjects.incrementCounterSubject.onNext();
  },

  loadCounter: function (data) {
    subjects.loadCounterSubject.onNext(data);
  },

  receiveCounter: function (data) {
    subjects.receiveCounterSubject.onNext(data);
  }
};
