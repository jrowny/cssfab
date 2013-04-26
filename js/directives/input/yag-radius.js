/*global hljs:true jQuery:true $:true, app:true, angular:true */

app.directive('yagRadius', function($compile, $timeout){
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
      }
      $scope.getValue = function(){
        if(app.allEqual($scope.value)){
          return $scope.value.tl;
        }
        return $scope.value.tl + ", " +
               $scope.value.tr + ", " +
               $scope.value.br + ", " +
               $scope.value.bl;
      };
    },
    template: '<div class="control-group clearfix">' +
                  '<label class="control-label" for="{{iid}}">{{title}}</label>' +
                  '<div class="controls">' +
                    '<div class="input-prepend">' +
                      '<div class="switch"> ' +
                          '<input type="checkbox" ng-model="enabled"> ' +
                          '<label><i></i></label>' +
                      '</div>' +
                      '<span ng-click="show()" class="radius" ng-class="{true:\'\', false:\'disabled\'}[enabled]">{{getValue()}}</span>' +
                      '<select name="{{iid}}-unit" id="{{iid}}-unit" class="input-mini"' +
                              'ng-disabled="!enabled"' +
                              'ng-model="unitValue" ' +
                              'ng-options="i as i for i in units"></select>' +
                    '</div>' +
                    '<div ng-show="vis && enabled" class="radius-input"><input type="number" ng-model="value.tl" class="input-mini tl"/>' +
              '<input type="number" ng-model="value.tr" class="input-mini tr"/>' +
              '<input type="number" ng-model="value.br" class="input-mini br"/>' +
              '<input type="number" ng-model="value.bl" class="input-mini bl"/></div>' +
                  '</div>' +
                '</div>',
    link: link
  };
});