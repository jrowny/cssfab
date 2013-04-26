app.directive("cssModel", function(){
  return{
    replace: true,
    restrict: 'E',
    templateUrl: 'views/components/css-model.html',
    scope: {
      style: '=',
      shown: '=',
      title: '@'
    },
    link: function(scope, element, attrs){
    },
    controller: function($scope){
      $scope.dropshown = false;
      $scope.section = 'General';
      $scope.limit = function(type){
        for(var i = 0, len = $scope.style.elements.length; i < len; i++){
          if($scope.style.elements[i].type == type){
            return false;
          }
        }
        return true;
      };
      $scope.setSection = function(section){
        $scope.section = section;
      };
      $scope.addElement = function(type){
        $scope.section = $scope.style.newElement(type);
        $scope.dropshown = false;
      };
      $scope.removeElement = function(where){
        $scope.style.elements.splice(where, 1);
        if($scope.style.elements.length){
          if(where===0) where = 1;
          $scope.section = $scope.style.elements[where-1].name;
        }
      };
    }
  };
});