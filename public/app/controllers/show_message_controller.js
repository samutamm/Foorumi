FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api){
  // Toteuta kontrolleri tähän
  Api.getMessage($routeParams.id).success(function(message) {
    $scope.message = message;
    $scope.replies = message.Replies;
  });

  $scope.addReply = function(reply) {
    Api.addReply(reply, $scope.message.id).success(function(reply) {
      $scope.reply = {};
      $scope.replies.push(reply);
    });
  }
});
