/*global hljs:true jQuery:true angular:true */
app.directive('switch', function(){
  "use strict";
  var link = function(scope, element, attrs) {
  };
  return {
    restrict : 'E',
    replace: true,
    scope: {ngModel:'=',
            iid:'@'},
    templateUrl: 'views/switch.html',
    link: link
  };
});