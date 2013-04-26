app.directive("styleFrame", function($compile){

  return{
    restrict: "E",
    transclude: true,
    replace:true,
    compile: function compile(tElement, tAttrs, transclude) {
        return {
            pre: function(scope) {
                transclude(scope, function(clone) {
                  scope.transcluded_content = clone;
                });
            },
            post:  function(scope, element, attrs){
              var head = element.contents().find('head');
              head.append('<link rel="stylesheet" href="lib/normalize.css" type="text/css" />');
              head.append('<link rel="stylesheet" href="assets/result.css" type="text/css" />');
              var dataStyle = angular.element('<style></style>');
              head.append(dataStyle);
              element.contents().find('body').html(scope.transcluded_content);
              scope.$watch("sources.normal + sources.hover", function(newv, oldv){
                dataStyle.text(newv);
              });

            }
        };
    },
    template: '<iframe src="javascript:&nbsp;"></iframe>'
  };

});