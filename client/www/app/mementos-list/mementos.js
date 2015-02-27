(function() {
  'use strict';

  angular
    .module('app.mementos')
    .controller('Mementos', Mementos);

  /* @ngInject */
  function Mementos(dataservice, CurrentMoment, $state) {
    /*jshint validthis: true */
    var vm = this;
    vm.mementos = {};
    vm.title = 'Mementos';
    vm.addMoment = addMoment;
    vm.getMoment = getMoment;
    vm.getMementos = getMementos
    vm.goToMomentCreate = goToMomentCreate;
    vm.createMode = false;
    vm.momentID = {};

    activate();

    ////////////////////////////////////////////////////////////

    function activate() {
      return vm.getMementos().then(function() {
        console.log('Activated mementos view');
        // get moment and check if we are in createMode
        return getMoment();
      });
    }

    function getMementos() {
      return dataservice.getMementos()
        .then(function(mementos) {
          console.log('Successful getting mementos');
          vm.mementos = mementos.data;
        })
        .catch(function(err) {
          console.error('There was an error getting mementos:', err);
        });
    }

    function addMoment(mementoID) {
      // if we are in momentCreate mode, addMoment
      if(vm.createMode) {
        // update memento in database
        return dataservice.updateMemento(mementoID, vm.momentID)
          .then(function(data) {
            console.log('Memento ' + mementoID + ' has been updated');
            
            // NOTE: sets moment back to an empty object
            CurrentMoment.set({});
            
            // NOTE: sets moment create mode back to false
            vm.createMode = false;
          })
          .catch(function(err) {
            console.error('There was an error updating the memento:', err);
          })
      }

    }

    function getMoment() {
      vm.momentID = CurrentMoment.get();
      
      // check if we are in create mode
      if(vm.momentID.hasOwnProperty('momentID')) {
        vm.createMode = true;
      } 
    }

    // NOTE: all this nav functionality are candidates for a nav service 
    function goToMomentCreate () {
      return $state.go('moment')
    }

  }
})();
