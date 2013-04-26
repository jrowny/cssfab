/*global hljs:true jQuery:true $:true, app:true, RGBA:true, angular:true */

app.directive('yagRgba', function($compile, $timeout){
  "use strict";
  var link = function(scope, element, attrs) {
    $.minicolors.init();
    $timeout(function(){
      $('#' + attrs.iid).on("change", function(event){
        var mc = $.minicolors.rgbObject($('#' + attrs.iid));
        scope.value = new RGBA(mc.r, mc.g, mc.b, mc.a);
        scope.$apply();
      });
    });
    scope.$watch("value", function(newValue, oldValue){
      $.minicolors.refresh();
    });
  };
  return {
    restrict : 'E',
    replace: true,
    scope: {title:'@',
            iid:'@',
            enabled:'=',
            value:'='},
    templateUrl: 'views/input/rgba.html',
    link: link
  };
});