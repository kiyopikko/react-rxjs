/*jshint node:true, browser:true*/

var ENDPOINT_URL = '/api/';

module.exports = function (key, data) {

  if(!data) return;

  $.ajax({
    url: ENDPOINT_URL + key,
    dataType: 'json',
    type: 'POST',
    data: {counter: data.counter},
    success: function(successData) {
      console.log('save success: ', successData);
    },
    error: function(xhr, status, err) {
      console.error(ENDPOINT_URL + key, status, err.toString());
    }
  });
};