/*global hljs:true jQuery:true angular:true */
app.directive('yagGradient', function($timeout){
  "use strict";
  var link = function(scope, element, attrs) {
    var picker = element.find('.slider');
    var setPosition = function(where, howmuch){
      $timeout(function(){
        scope.values[where].position = howmuch;
      });
    };
    var onSliderChange = function(e, ui){
      for(var i = 0, len = ui.values.length; i < len; i++){
        setPosition(i, ui.values[i]);
      }
    };

    var vals = [];
    for(var i = 0, len = scope.values.length; i < len; i++){
      vals.push(scope.values[i].position);
    }
    picker.slider({values: vals, change: onSliderChange, stop: function(e, ui){
        console.log(e);
        console.log(ui);
    }});
    
  };
  return {
    restrict : 'E',
    replace: true,
    scope: {title:'@',
            iid:'@',
            enabled:'=',
            values:'='},
    template: '<div class="control-group clearfix">' +
                  '<label class="control-label" for="{{iid}}">{{title}}</label>' +
                  '<div class="controls">' +
                    '<div class="slider"></div>' +
                  '</div>' +
              '</div>',
    link: link
  };
});