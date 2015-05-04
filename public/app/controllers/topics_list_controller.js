FoorumApp.controller('TopicsListController', function($scope, $location, Api){
  // Toteuta kontrolleri tähän
  Api.getTopics().success(function(topics) {
    $scope.topics = topics;
  });

  $scope.addTopic = function(newTopic) {
    var topicData = JSON.stringify(newTopic);
    Api.addTopic(topicData).success(function(data, status) {
      console.log("Status: " + status);
      $scope.topics.push(JSON.parse(topicData));
    })
    .error(function(data, status) {
      console.log("Status: " + status);
    });
  };
});
