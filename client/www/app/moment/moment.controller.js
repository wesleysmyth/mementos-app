(function() {
  'use strict';

  angular
    .module('app.moment')
    .controller('Moment', Moment);

  /* @ngInject */
  function Moment($state) {
    /*jshint validthis: true */
    var vm = this;
    vm.createMoment = createMoment;

    animate();

    ////////////////////////////////
    
    function animate() {
      // NOTE: use this to fetch update for notification circle
    }

    function createMoment() {
      $state.go('momentCreate');
    }

  }

})();
