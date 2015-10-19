/*jshint node:true, browser:true*/
var Promise = require('es6-promise').Promise;

var ENDPOINT = '/api/';

module.exports = {

  load: function (namespace) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: ENDPOINT + namespace,
        dataType: 'json',
        cache: false,
        success: function(data) {
          resolve(data);
        },
        error: function(xhr, status, err) {
          reject(ENDPOINT + namespace, status, err.toString());
        }
      });
    });
  },

  save: function (namespace, data) {
    $.ajax({
      url: ENDPOINT + namespace,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(successData) {
        console.log(successData);
      },
      error: function(xhr, status, err) {
        console.error(ENDPOINT + namespace, status, err.toString());
      }
    });
  }
};