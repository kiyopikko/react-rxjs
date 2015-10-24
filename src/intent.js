var Rx = require('rx');

var ds = require('./datastore');

const KEY = 'INCREMENT_COUNTER';

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

  loadCounter: function () {
    onCounterLoaded(function(data){
      subjects.loadCounterSubject.onNext(data);
    });
  },

  watchCounter: function () {
    onCounterArrived(function(data){
      subjects.receiveCounterSubject.onNext(data);
    });
  }
};

// message comes from milkcocoa
function onCounterArrived(callback){
  ds.on('set', (setted) => {
    switch(setted.id){
      case KEY:
        callback(setted.value);
        break;
      default:
        console.error('Not registered action');
    }
  });
}

// load data from milkcocoa
function onCounterLoaded(callback){
  ds.get(KEY, (err, datum) => {
    if(err){
      if(err === 'not found'){
        var initialCounter = {counter: 0};
        ds.set(KEY, initialCounter);
        callback(initialCounter);
      }else{
        console.error(err);
      }
      return;
    }
    callback(datum.value);
  });
}