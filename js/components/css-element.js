
app.directive('cssElement', function($compile){
  "use strict";
  return{
    restrict: 'E',
    replace: true,
    link: function(scope, element, attrs){
      var template = "";
      switch(scope[attrs.ngModel].type){
        case "general":
          template = '<general element="' + attrs.ngModel + '"></general>';
        break;
        case "text":
          template = '<text element="' + attrs.ngModel + '"></text>';
        break;
        case "positioning":
          template = '<positioning element="' + attrs.ngModel + '"></positioning>';
        break;
        case "boxModel":
          template = '<box-model element="' + attrs.ngModel + '"></box-model>';
        break;
        case "border":
          template = '<border element="' + attrs.ngModel + '"></border>';
        break;
        case "boxShadow":
          template = '<box-shadow element="' + attrs.ngModel + '"></box-shadow>';
        break;
        case "gradient":
          template = '<gradient element="' + attrs.ngModel + '"></gradient>';
        break;
      }
      element.html(template);
      $compile(element.contents())(scope);
    }
  };
});