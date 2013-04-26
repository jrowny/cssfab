app.directive("boxShadow", function(){
  return{
    replace: false,
    restrict: 'E',
    scope: {
      element: '='
    },
    controller: function($scope, $rootScope){
      $scope.lookups = $rootScope.lookups;
      $scope.idp = $scope.element.name.split(" ").join("");
    },
    templateUrl: 'views/components/box-shadow.html'
  };
});