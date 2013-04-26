app.directive("boxModel", function(){
  return{
    replace: false,
    restrict: 'E',
    scope: {
      element: '='
    },
    controller: function($scope, $rootScope){
      $scope.lookups = $rootScope.lookups;
    },
    templateUrl: 'views/components/box-model.html'
  };
});