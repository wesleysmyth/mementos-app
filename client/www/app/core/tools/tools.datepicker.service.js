(function() {
  'use strict';

  angular
    .module('app.tools')
    .factory('DatePicker', DatePicker);

  /* @ngInject */
  function DatePicker($q, $cordovaDatePicker) {
    
    var service = {
      showDatePicker: showDatePicker,
      showTimePicker: showTimePicker
    };

    return service;

    function showDatePicker() {
      var q = $q.defer();

      // DOCs about Options
      // https://github.com/VitaliiBlagodir/cordova-plugin-datepicker
      var datePickerOptions = {
        date: new Date(),
        mode: 'date',
        allowOldDates: false
      };

      $cordovaDatePicker.show(datePickerOptions)
        .then(function(date){
          q.resolve(date);
          console.log(date);
        }, function(err) {
          q.reject(err);
        });

      return q.promise;
    }

    function showTimePicker() {
      var q = $q.defer();

      var timePickerOptions = {
        date: new Date(),
        mode: 'time',
        allowOldDates: false
      };

      $cordovaDatePicker.show(timePickerOptions)
        .then(function(time){
          q.resolve(time);
          console.log(time);
        }, function(err) {
          q.reject(err);
        });

      return q.promise;
    }
  }

})();
