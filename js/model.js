/*
 * Utility Functions
 */
 //utility function to append units
var united = function(obj){
  return obj.value + obj.unit;
};

//utility function for getting CSS values from various kinds of properties
var getCSSValues = function(css, element){
  for(var prop in element) {
    if(element.hasOwnProperty(prop) &&
      (element[prop].hasOwnProperty('enabled') && element[prop].enabled)){
      if(element[prop].value.top !== undefined && element[prop].hasOwnProperty('unit')){
        if(app.allEqual(element[prop].value)){
          css[prop] = element[prop].value.top + element[prop].unit;
        }else if(element[prop].value.top == element[prop].value.bottom &&
                 element[prop].value.left == element[prop].value.right){
          css[prop] = element[prop].value.top + element[prop].unit + " " +
                      element[prop].value.right + element[prop].unit;
        }else{
          css[prop] = element[prop].value.top + element[prop].unit + " " +
                      element[prop].value.right + element[prop].unit + " " +
                      element[prop].value.bottom + element[prop].unit + " " +
                      element[prop].value.left + element[prop].unit;
        }
      }else{
        css[prop] = element[prop].value;
        if(element[prop].hasOwnProperty('unit')) css[prop] += element[prop].unit;
      }
    }
  }
  return css;
};

/*
 * Models
 */
var RGBA = function(r, g, b, a){
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
};

//returns the hex, obviously ignoring alpha
RGBA.prototype.getHex = function(){
  function hexify(n) {
    var hex = n.toString(16);
    return (hex.length == 1) ? "0" + hex : hex;
  }
  return "#" + hexify(this.r) + hexify(this.g) + hexify(this.b);
};
//returns the rgba value, like toString
RGBA.prototype.toString = function(){
  return "rgba("+this.r + "," + this.g + "," + this.b + "," + this.a + ")";
};

/**
 * GENERAL - Element
 */
var General = function(){
  this.name = "General";
  this.type = "general";
  this.display = {value:"block", enabled: false};
  this.overflow = {value:"auto", enabled: false};
  this.opacity = {value:1, enabled: false};
  this['background-color'] = {value:new RGBA(150,150,150,1), enabled: false};
};
General.prototype.getValue = function(css){
  return getCSSValues(css, this);
};

/**
 * TEXT - Element
 */
var Text = function(){
  this.name = "Text";
  this.type = "text";
  this['text-transform'] = {value:"capitalize", enabled: false};
  this['text-decoration'] = {value:"blink", enabled: false};
  this['text-align'] = {value:"left", enabled: false};
  this['white-space'] = {value:"normal", enabled: false};
  this['text-indent'] = {value:20, unit: "px", enabled: false};
  this['line-height'] = {value:20, unit: "px", enabled: false};
  this['letter-spacing'] = {value:2, unit: "px", enabled: false};
  this['color'] =  {value:new RGBA(150, 150, 150, 1), enabled: false};
};
Text.prototype.getValue = function(css){
  return getCSSValues(css, this);
};

/**
 * POSITIONING - Element
 */
var Positioning = function(){
  this.name = "Positioning";
  this.type = "positioning";
  this.position = {value:"absolute", enabled: true};
  this.top = {value:40, unit: "px", enabled: true};
  this.left = {value:100, unit: "px", enabled: true};
  this.bottom = {value:100, unit: "px", enabled: false};
  this.right = {value:100, unit: "px", enabled: false};
};
Positioning.prototype.getValue = function(css){
  return getCSSValues(css, this);
};


/**
 * Gradient - Element
 */
var Gradient = function(){
  this.name = "Gradient";
  this.type = "gradient";
  this.direction = "bottom";
  this['gradient-type'] = "linear";
  this.stops = [{position: 0, color: new RGBA(255,255,255,.45)},
                {position: 100, color: new RGBA(0,0,0,.45)}];
};
Gradient.prototype.getValue = function(css){
  var source = ["-webkit-" + this['gradient-type'] + "-gradient(" + this.direction + ", \n"];
  var innerSource = [];
  for(var i = 0, len = this.stops.length; i < len; i++){
    innerSource.push("                      " + this.stops[i].color.toString() + " " + this.stops[i].position + "%");
  }
  source.push(innerSource.join(",\n"));
  source.push(")");
  css["background-image"] = source.join("");
  return getCSSValues(css, this);
};

/**
 * BOX MODEL - Element
 */
var BoxModel = function(){
  this.name = "Box Model";
  this.type = "boxModel";
  this.padding = {value:{top:10,right:10,bottom:10,left:10}, unit:"px", enabled: true};
  this.margin = {value:{top:10,right:10,bottom:10,left:10}, unit:"px", enabled: false};
  this.width = {value: 300, unit: "px", enabled: true};
  this.height = {value:200, unit: "px", enabled: true};
  this['box-sizing'] = {value:"inherit", enabled: false};
};
BoxModel.prototype.getValue = function(css){
  return getCSSValues(css, this);
};

/**
 * BOX SHADOW - Element
 */
var BoxShadow = function(){
  this.name = "Box Shadow";
  this.type = "boxShadow";
  this.inset = false;
  this.horizontal = {value: 2, unit: "px"};
  this.vertical = {value: 2, unit: "px"};
  this.blur = {value: 10, unit: "px", enabled: true};
  this.spread = {value: 0, unit: "px", enabled: true};
  this['color'] = new RGBA(150, 150, 150, 0.75);
  this.enabled = true;
};
BoxShadow.prototype.getValue = function(css){
  if(this.enabled){
      if(css["box-shadow"] === undefined) css["box-shadow"] = "";
      css["box-shadow"] += (css["box-shadow"].length) ? ",\n               " : "";
      css["box-shadow"] += united(this.horizontal) + " " +
                           united(this.vertical);

      if(this.blur.enabled){
        css["box-shadow"] += " " + united(this.blur);
      }

      if(this.spread.enabled){
        css["box-shadow"] += " " + united(this.spread);
      }
      css["box-shadow"] += " " + this.color.toString();

      if(this.inset){
        css["box-shadow"] += " inset";
      }
  }
  if(css["box-shadow"] !== undefined && css["box-shadow"].length === 0){
    delete css["box-shadow"];
  }
  return css;
};

/**
 * BORDER - Element
 */
var Border = function(){
  this.name = "Border";
  this.type = "border";
  this.radius = {value: {tl:5, tr:5, br:5, bl:5},
             unit: "px",
             enabled: true};
  this.style = "solid",
  this.thickness = {value: 1, unit: "px"};
  this.color = new RGBA(150,150,150,0.75);
  this.enabled = true;
};

Border.prototype.getValue = function(css){
  if(this.enabled){
    css['border'] = this.thickness.value + this.thickness.unit + " " + this.style + " " + this.color.toString();
    if(this.radius.enabled){
      if(app.allEqual(this.radius.value)){
            css['border-radius'] = this.radius.value.tl + this.radius.unit;
          }else{
            css['border-radius'] = this.radius.value.tl + this.radius.unit + " " +
                                   this.radius.value.tr + this.radius.unit + " " +
                                   this.radius.value.br + this.radius.unit + " " +
                                   this.radius.value.bl + this.radius.unit;
          }
      }
  }
  return css;
};


/**
 * STYLE
 */
var Style = function(sample){
  "use strict";
  if(sample){
    this.elements = [
      new General(),
      new Positioning(),
      new BoxModel(),
      new Border()
    ];
  }else{
    this.elements = [];
  }
};

Style.prototype.checkName = function(name){
  var okay = true;

  //any conflicts?
  for(var i = 0, len = this.elements.length; i < len; i++){
    if(this.elements[i].name == name){
      okay = false;
      break;
    }
  }

  if(okay) return name;
  var index = name.match(/\d/g);
  //figure out a new name
  if(!index){
    name = name + " 1";
  }else{
    name = name.replace(index, (parseInt(index, 10)+1).toString());
  }
  return this.checkName(name);
};

Style.prototype.newElement = function(type){
  //check if there is one already
  //fix conflicting name
  var toAdd;
  switch(type){
    case "general":
      toAdd = new General();
      break;
    case "text":
      toAdd = new Text();
      break;
    case "positioning":
      toAdd = new Positioning();
      break;
    case "boxModel":
      toAdd = new BoxModel();
      break;
    case "boxShadow":
      toAdd = new BoxShadow();
      break;
    case "border":
      toAdd = new Border();
      break;
    case "gradient":
      toAdd = new Gradient();
      break;
  }
  toAdd.name = this.checkName(toAdd.name);
  this.elements.push(toAdd);
  return toAdd.name;
};

//i'm recalculating this on every single change?
//I  don't need to do that. TODO: Fix that
Style.prototype.getCSS = function(){
  var css = {};
  for(var i = 0, len = this.elements.length; i < len; i++){
    css = this.elements[i].getValue(css);
  }
  return css;
};