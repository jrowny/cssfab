/*global hljs:true jQuery:true $:true, app:true, angular:true */

app.directive('yagBool', function($compile, $timeout){
  "use strict";
  return {
    restrict : 'E',
    replace: true,
    scope: {title:'@',
            iid:'@',
            value:'=',
            enabled:'='},
    template: '<div class="control-group clearfix">' +
                  '<label class="control-label" for="{{iid}}">{{title}}</label>' +
                  '<div class="controls">' +
                      '<button class="btn" type="button" ' +
                              'ng-disabled="!enabled"' +
                              'ng-click="value=!value">' +
                              '<span ng-show="value">Yes</span><span ng-show="!value">No</span>' +
                      '</button>' +
                  '</div>' +
                '</div>'
  };
});