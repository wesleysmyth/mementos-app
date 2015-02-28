(function() {
  'use strict';

  angular
    .module('app.moment')
    .controller('Moment', Moment);

  /* @ngInject */
  function Moment($state, logout) {
    /*jshint validthis: true */
    var vm = this;
    vm.createMoment = createMoment;
    vm.goToMementos = goToMementos;
    vm.logoutUser = logoutUser;

    animate();

    ////////////////////////////////
    
    function animate() {
      // NOTE: use this to fetch update for notification circle
    }

    function createMoment() {
      $state.go('momentCreate');
    }

    // NOTE: all this nav functionality are candidates for a nav service 
    function goToMementos () {
      $state.go('mementos')
    }

    function logoutUser() {
      logout.show()
    }

  }

})();
