(function() {
  'use strict';

  angular
    .module('app.memento.create')
    .controller('MementoCreate', MementoCreate);

  /* @ngInject */
  function MementoCreate($state, dataservice, CurrentMoment, $ionicHistory) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = 'Create Memento';
    vm.currentMemento = new EmptyMemento();
    vm.currentMoment = {};
    vm.saveMemento = saveMemento;
    vm.goBack = goBack;

    activate();

    ////////////////////////////////////////////////////////////

    function activate() {
      vm.currentMoment = CurrentMoment.get().momentID;
    }
    
    function saveMemento(currentMemento) {
      currentMemento.moments.push(vm.currentMoment);

      return dataservice.saveMemento(currentMemento)
        .then(function(mementoID) {
          console.log('Memento ' + mementoID.data + ' has been saved.');

          // NOTE: sets moment back to an empty object
          CurrentMoment.set({});

          $state.go('memento', {ID: mementoID.data});
          
        })
        .catch(function(err) {
          // TODO: Connection errors, DB errors.
          // savingError(err);
          console.error('There was an error saving memento:', err);
        });
    }
    
    // NOTE: all this nav functionality are candidates for a nav service 
    function goBack() {
      return $ionicHistory.goBack()
    }

    function EmptyMemento() {
      this.title = '';
      /*this.owner = 'User1'; */
      /*this.authors = [];*/
      this.recipients = [];
      this.options = {
        'public'  : false,
        'releaseType' : 'default',
      };
      this.moments = [];
    }
  }
})();
