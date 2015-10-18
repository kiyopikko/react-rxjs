var Rx = require('rx');
var update = require('react/lib/update');

var Intent = require('./intent');

var subject = new Rx.ReplaySubject(1);

var milkcocoa = new MilkCocoa("your-app-id.mlkcca.com");
var ds = milkcocoa.dataStore('react-rxjs');

var state = {
  counter: 0
};

loadCounterFromServer(function(data){
  state = {
    counter: data.counter
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
    console.log(data);
  });
});

ds.on('set', function(setted){
  switch(setted.id){
    case 'INCREMENT_COUNTER':
      subject.onNext(setted.value);
      break;
    default:
      console.error('Not registered action');
  }
});


function loadCounterFromServer(callback) {
  ds.get('INCREMENT_COUNTER', function(err, datum){
    if(err){
      if(err ==='not found'){
        var initialState = {counter: 0};
        ds.set('INCREMENT_COUNTER', initialState);
        callback(initialState);
      }else{
        console.error(err);
      }
      return;
    }
    callback(datum.value);
  });
}

function saveCounterToServer(state, callback) {
  ds.set('INCREMENT_COUNTER', state,
  function(err, datum){
    if(err){
      console.error(err);
      return;
    }
    callback(datum.value);
  }, function(err){
    console.error(err);
  });
}

module.exports = {
  subject: subject
};
