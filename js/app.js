var app = angular.module('yacg', []);

//are all members of an object equal?
app.allEqual = function(val){
  var first;
  for(var prop in val){
    if(first === undefined){
     first = val[prop];
    }else if(val.hasOwnProperty(prop) && val[prop] != first){
      return false;
    }
  }
  return true;
};

app.cssProp = function(name, value){
  return "   " + name + ": " + value + ";";
};

//compatibility
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function(fn, scope) {
    for(var i = 0, len = this.length; i < len; ++i) {
      fn.call(scope, this[i], i, this);
    }
  };
}