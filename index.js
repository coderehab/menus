import Menu from "./module/Menu.js";

var autoload = false;
if (autoload){
  require('./sass/menu.scss');
  var menu = new Menu();
}
 
module.exports = require('./module/Menu.js')
