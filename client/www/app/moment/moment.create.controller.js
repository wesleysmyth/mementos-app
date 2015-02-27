(function() {
  'use strict';

  angular
    .module('app.moment')
    .controller('MomentCreate', MomentCreate);

  /* @ngInject */
  function MomentCreate($state, dataservice, CurrentMoment, $ionicHistory, $ionicLoading, DatePicker) {
    
    /*jshint validthis: true */
    var vm = this;
    vm.saveMoment = saveMoment;
    vm.currentMoment = new EmptyMoment();
    vm.goBack = goBack;
    vm.showSaveProgress = showSaveProgress;
    vm.hideSaveProgress = hideSaveProgress;
    vm.showDatePicker = showDatePicker;
    vm.showTimePicker = showTimePicker;
    vm.date;
    vm.time;

    console.log(vm.currentMoment);
      
    //////////////////////////////////////////////////

    function saveMoment(currentMoment) {
      // opens saving in progress window
      vm.showSaveProgress();

      dataservice.saveMoment(currentMoment)
        .then(function(momentID) {
          console.log('Moment ' + momentID.data + ' has been saved');
          
          // saves moment ID
          CurrentMoment.set({momentID: momentID.data});
          
          // closes saving in progress window and send user to mementos view
          $state.go('mementos');
          vm.hideSaveProgress();

          // resets currentMoment
          vm.currentMoment = new EmptyMoment();
        })
        .catch(function(err) {
          console.error('There was an error saving moment:', err);

          // saveMoment again
          // vm.saveMoment(vm.currentMoment);
        });
    }

    function EmptyMoment() {
      var today = new Date();
      this.title = '';
      this.content = []; 
      this.releaseDate = today.setFullYear(today.getFullYear() + 1);
      this.meta = {
        location: {
          latitude: null,
          longitude: null,
          place: ''
        }
      };
    }
    
    // FIXME: need to calculate precise date and time in milliseconds to pass to releaseDate
    function showDatePicker() {
      DatePicker.showDatePicker()
        .then(function(date) {
          vm.date = date.getTime();
        })
        .catch(function(err) {
          console.error(err)
        })
    }

    function showTimePicker() {
      DatePicker.showTimePicker()
        .then(function(time) {
          vm.time = time.getTime();
        })
        .catch(function(err) {
          console.error(err)
        })
    }
    
    // NOTE: all this nav and progress functionality should become part of a service library
    function goBack() {
      var plus = document.getElementsByClassName('plusSign')[0];
      
      // fades in and antispins plus sign
      setTimeout(function() {
        plus.className = plus.className.split(' fadeout')[0] + ' fadein antispin';
      }, 100);

      // removes antispin class
      setTimeout(function() {
        var plus = document.getElementsByClassName('plusSign')[0];
        plus.className = plus.className.split(' antispin')[0];
      }, 400);

      return $ionicHistory.goBack()
    }

    function showSaveProgress() {
      return $ionicLoading.show({
        template: 'Saving moment...'
      });
    }

    function hideSaveProgress() {
      return $ionicLoading.hide();
    }

  }

})();
