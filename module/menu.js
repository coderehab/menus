export default class Menu {
  constructor(args){
    this.config(args);
  }

  config (args = {}) {
    var defaultConfig = this.settings || {
      menu_selector: '#main-menu',
      menu_trigger_selector: '.toggle-menu',
      tap_hide_area: '.tap-hide-area',
    }

    for (var setting in defaultConfig){
      if(args[setting]) defaultConfig[setting] = args[setting];
    }

    this.settings = defaultConfig;
    return this;
  }
}
