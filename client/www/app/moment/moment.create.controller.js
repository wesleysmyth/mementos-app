(function() {
  'use strict';

  angular
    .module('app.moment')
    .controller('MomentCreate', MomentCreate);

  /* @ngInject */
  function MomentCreate($state, dataservice, CurrentMoment, $ionicHistory) {
    
    /*jshint validthis: true */
    var vm = this;    
    vm.saveMoment = saveMoment;
    vm.currentMoment = new EmptyMoment();
    vm.goBack = goBack;
      
    //////////////////////////////////////////////////

    function saveMoment(currentMoment) {
      // TODO: Show loading screen when the moment is saving;
      // savingInProgress();

      dataservice.saveMoment(currentMoment)
        .then(function(momentID) {
          console.log('Moment ' + momentID.data + ' has been saved');
          CurrentMoment.set({momentID: momentID.data});
          $state.go('mementos');
        })
        .catch(function(err) {
          // TODO: Connection errors, DB errors.
          // savingError(err);
          console.error('There was an error saving moment:', err);
        });
    }

    function goBack() {
      return $ionicHistory.goBack()
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

  }

})();
