/*global angular:true Style:true $:true, BoxShadow:true, app:true*/
function AppCtrl($scope, $rootScope){
  "use strict";
  $scope.sources = {
    normal: "",
    hover: "",
    before: "",
    after: ""
  };
  
  $scope.normal = new Style(true);
  $scope.hover = new Style(false);
  $scope.before = new Style(false);
  $scope.after = new Style(false);

  $rootScope.lookups = {
    units: ["px", "pt", "%", "em"],
    unitsNoPercent: ["px", "pt", "em"],
    position: ["absolute", "relative", "fixed"],
    display: ["block", "inline", "inline-block", "none"],
    overflow: ["visible", "hidden", "scroll", "auto", "inherit"],
    borderStyle: ["none", "solid", "dashed", "dotted", "hidden", "double", "groove", "ridge", "inset", "outset", "inherit"],
    boxSizing: ["content-box", "border-box", "inherit"],
    whiteSpace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "inherit"],
    align: ["left", "right", "center"],
    textTransform: ["none", "capitalize", "uppercase", "lowercase", "inherit"],
    textDecoration: ["none", "underline", "overline", "line-through", "blink", "inherit"],
    gradientTypes: ["linear", "radial"],
    gradientDirections: ["top", "bottom", "left", "right", "center", "top left", "top right", "bottom left", "bottom right"]

  };

  $scope.output = "Welcome!\n"+
                  "========\n" +
                  'This tool allows you to mockup CSS styles quickly. Adjust the *settings* on the left side of the page and watch this area change.' +
                  '**Click on this area** to change the contents of this area using <a href="http://daringfireball.net/projects/markdown/basics" ' +
                  'target="_new">markdown</a> or <strong>html</strong>';


  var compileSource = function(style, pseudo){
    if(style.elements.length){
      var compiled = style.getCSS(),
          source = [".element"];
          if(pseudo.length) source.push(":" + pseudo);
          source.push("{");
      for(var prop in compiled) {
        if(compiled.hasOwnProperty(prop))
            source.push("\n" + app.cssProp(prop, compiled[prop]));
      }
      source.push("\n}");
      return source.join('');
    }
    return "";
  };


  //for some reason, binding directly to the functions is way heavier
  $scope.$watch("normal.elements", function(){
    $scope.sources.normal = compileSource($scope.normal, "");
  }, true);
  $scope.$watch("hover.elements", function(){
    $scope.sources.hover = compileSource($scope.hover, "hover");
  }, true);
  $scope.$watch("before.elements", function(){
    $scope.sources.before = compileSource($scope.before, "before");
  }, true);
  $scope.$watch("after.elements", function(){
    $scope.sources.after = compileSource($scope.after, "after");
  }, true);
}
