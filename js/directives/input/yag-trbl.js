/*global hljs:true jQuery:true app:true, $:true, angular:true */

app.directive('yagTrbl', function($compile, $timeout){
  "use strict";
  var link = function(scope, element, attrs) {
    
  };
  return {
    restrict : 'E',
    replace: true,
    scope: {title:'@',
            iid:'@',
            enabled:'=',
            value:'=',
            unitValue: '=',
            units:'='},
    controller: function($scope){
      $scope.vis = false;
      $scope.show = function(){
        $scope.vis = ($scope.enabled) ? !$scope.vis : false;
      };
      $scope.getValue = function(){
        if(app.allEqual($scope.value)){
          return $scope.value.top;
        }else if($scope.value.top === $scope.value.bottom &&
                 $scope.value.right === $scope.value.left){
          return $scope.value.top + ", " + $scope.value.right;
        }
        return $scope.value.top + ", " +
               $scope.value.right + ", " +
               $scope.value.bottom + ", " +
               $scope.value.left;
      };
    },
    templateUrl: 'views/input/trbl.html',
    link: link
  };
});