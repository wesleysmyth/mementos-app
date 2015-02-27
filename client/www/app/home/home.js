(function() {
  'use strict';

  angular
    .module('app.home')
    .controller('Home', Home);

  /* @ngInject */
  function Home($state) {
    /*jshint validthis: true */
    var vm = this;
    vm.splash = splash;

    activate()

    ////////////////////////////////
    
    function activate() {
      return splash();
    }
    
    // NOTE: splash goes to moment page after several seconds
    function splash() {
      setTimeout(function(){
        // FIXME: fade class does not currently exist
        angular.element(document.querySelector('div.home')).addClass('fade');
        setTimeout(function() {
          $state.go('moment');
        }, 400);
      }, 3500);
    }
  }
})();
