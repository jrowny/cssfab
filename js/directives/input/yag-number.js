/*global hljs:true jQuery:true angular:true */
app.directive('yagNumber', function(){
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
            min: '@',
            max: '@',
            step: '@'},
    templateUrl: 'views/input/number.html',
    link: link
  };
});