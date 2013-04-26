/*global hljs:true jQuery:true angular:true */
app.directive('yagUnit', function(){
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
    templateUrl: 'views/input/unit.html',
    link: link
  };
});