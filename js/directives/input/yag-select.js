/*global hljs:true jQuery:true angular:true */
app.directive('yagSelect', function(){
  "use strict";
  var link = function(scope, element, attrs) {
  };
  return {
    restrict : 'E',
    replace: true,
    priority: 100,
    scope: {title:'@',
            iid:'@',
            enabled:'=',
            value:'=',
            lookup:'='},
    templateUrl: 'views/input/select.html',
    link: link
  };
});