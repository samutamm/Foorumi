FoorumApp.controller('UsersController', function($scope, $location, Api){

    $scope.logIn = function(userCredentials) {
      Api.login(userCredentials)
      .success(function(user){
        $location.path('/');
      })
      .error(function(){
        console.log('Kirjautuminen epäonnistui! Lisätään käyttäjälle virheilmoitus');
        $scope.errorMessage = 'Väärä käyttäjätunnus tai salasana!';
        $scope.user = {};
      });
    }

    $scope.register = function(userCredentials) {
      Api.register(userCredentials)
      .success(function() {
        $location.path('/');
      })
      .error(function() {
        $scope.errorMessage = 'Käyttäjätunnus on jo käytössä.'
        $scope.newUser = {};
      });
    }
});
