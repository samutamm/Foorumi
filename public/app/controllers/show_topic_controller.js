FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api){
  // Toteuta kontrolleri tähän
  Api.getTopic($routeParams.id).success(function(topic) {
    $scope.messages = topic.Messages;
    $scope.topic = topic;
  });

  $scope.addMessage = function(message) {
    Api.addMessage(message, $scope.topic.id).success(function(message) {
      $location.path('/messages/' + message.id);
    });
  };
});
