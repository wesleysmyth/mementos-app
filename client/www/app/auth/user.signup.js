(function() {
  angular
    .module('app.user.auth')
    .controller('UserSignup', UserSignup);

    /* @ngInject */
    function UserSignup(dataservice, $state, CurrentUser, Notifications, $ionicHistory) {
      vm = this;
      vm.credentials = {};
      vm.repeatPassword = '';
      vm.signup = signup;
      vm.goBack = goBack;

      //////////////////////////////////////

      function signup(credentials) {
        return dataservice.signup(credentials)
          .then(function(res) {            
            CurrentUser.set({
              sessionID: res.data.sessionID, 
              userID: res.data.userID
            });

            Notifications.emit('sendUser', { userID: res.data.userID });
            
            $state.go('moment');
          })
          .catch(function(err) {
            console.error(err);
          });
      }

      // NOTE: all this nav functionality are candidates for a nav service 
      function goBack() {
        return $ionicHistory.goBack()
      }
    }  
})();
