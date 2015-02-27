(function() {
  'use strict';

  angular
    .module('app.memento')
    .controller('Memento', Memento);

  /* @ngInject */
  function Memento(dataservice, $stateParams, download, $state) {
    /*jshint validthis: true */
    var vm = this;
    vm.memento = {};
    vm.mementoID = Number($stateParams.ID);
    vm.getMemento = getMemento;
    vm.goToMementos = goToMementos;
    vm.goToMomentCreate = goToMomentCreate;

    activate();
    
    ////////////////////////////////////////////////////////////

    function activate() {
      return getMemento(vm.mementoID)
        .then(function(data) {
          console.log('Successful activating memento')
        })
        .catch(function(err) {
          console.error('There was an error activating memento', err)
        });
    }
    
    function getMemento(ID) {
      return dataservice.getMemento(ID)
        .then(function(memento) {
          console.log('Successful getting memento');
          vm.memento = memento.data;
        })
        .catch(function(err) {
          console.error('There was an error getting memento', err);
        });
    }
    
    // NOTE: all this nav functionality are candidates for a nav service 
    function goToMementos () {
      return $state.go('mementos')
    }

    // NOTE: all this nav functionality are candidates for a nav service 
    function goToMomentCreate () {
      return $state.go('moment')
    }
    
  }
})();
