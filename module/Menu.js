export default class Menu {
  constructor(args){
    this.config(args);
    var selectors = this.settings.selectors;

    //init Menu
    this.menu = document.getElementById(selectors.menu_id);
    if(!this.menu) {
      console.error("unable to find the menu with selector: " + selectors.menu_id);
      return;
    };

    this.menuitems = this.menu.querySelectorAll(selectors.menuitem + ' a')

    //init submenus
    this.submenus = this.menu.querySelectorAll(selectors.submenu);
    if(this.submenus.length)
    for(var i=0; i < this.submenus.length; i++){
      this.submenus[i].parentNode.classList.add('am-has-children')
    }

    //init menuitems
    var handles;
    if(this.settings.options.use_handles){
      this.initHandles();
      handles = this.menu.querySelectorAll(selectors.menuitem + ' .handle');
    }else{
      handles = this.menu.querySelectorAll(selectors.menuitem + ' a');
    }

    this.registerEventAll(handles, 'click', this.onMenuItemClick);

    if(this.submenus.length)
    for(var i=0; i < this.submenus.length; i++){
      this.initSubmenu(this.submenus[i]);
    }

    // init toggleButtons
    this.toggleButtons = document.querySelectorAll(selectors.toggle_button);
    this.registerEventAll(this.toggleButtons, 'click', this.toggle);

    // init openButtons
    this.openButtons = document.querySelectorAll(selectors.open_button);
    this.registerEventAll(this.openButtons, 'click', this.open);

    // init closeButtons
    this.closeButtons = document.querySelectorAll(selectors.close_button);
    this.registerEventAll(this.closeButtons, 'click', this.close);

    //init swiping
    document.addEventListener('touchstart', this.onTouchStart.bind(this), false);
    document.addEventListener('touchmove', this.onTouchMove.bind(this), false);

    //document click
    if(this.settings.options.autoclose)
    document.addEventListener('mousedown', this.documentClick.bind(this))
  }

  config (args = {}) {
    var defaultConfig = this.settings || {
      options:{
        disable_scroll: false,
        autoclose: true,
        use_handles: true,
      },
      events: {
        swipeLeft: function(){},
        swipeRight: function(){},
        swipeUp: function(){},
        swipeDown: function(){}
      },
      selectors:{
        menu_id: 'main-menu',
        menuitem: 'li',
        submenu: 'li > ul',
        toggle_button: false,
        open_button: false,
        close_button: false,
      }
    }

    for (var config in defaultConfig){
      if(typeof defaultConfig[config] == "object" && args[config])
      for (var opt in defaultConfig[config]){
        if(typeof args[config][opt] != "undefined") {
          defaultConfig[config][opt] = args[config][opt];
        }
      }
    }

    this.settings = defaultConfig;
    console.log("Config::", this.settings);
    return this;
  }

  onMenuItemClick (e){
    var is_active = e.target.parentNode.classList.contains("active");
    var submenuitems = e.target.parentNode.parentNode.querySelectorAll('.am-has-children')
    for(var i = 0; i < submenuitems.length; i++){
      submenuitems[i].classList.remove('active')
    }
    if(!is_active) e.target.parentNode.classList.add("active");
    var submenu = e.target.parentNode.querySelector(this.settings.selectors.submenu);
    if(!submenu) {
      this.close();
      return;
    }

    e.preventDefault();
    e.target.parentNode.removeAttribute("style")
    this.toggleSubmenu(submenu);
  }

  toggle(){
    this.menu.classList.toggle('active')
    document.body.classList.toggle('am-menu-active');
    document.body.classList.toggle('menu-'+ this.settings.selectors.menu_id + '-active');

    if(this.settings.options.disable_scroll)
    document.body.classList.toggle('scroll-disabled');

    if(!this.menu.classList.contains('active')){
      for(var i = 0; i < this.submenus.length; i++){
        this.closeSubmenu(this.submenus[i]);
      }
    }
  }

  open(){
    this.menu.classList.add('active')
    document.body.classList.add('am-menu-active');
    document.body.classList.add('menu-'+ this.settings.selectors.menu_id + '-active');

    if(this.settings.options.disable_scroll)
    document.body.classList.add('scroll-disabled');
  }

  close(){
    var submenuitems = this.menu.querySelectorAll('.am-has-children')
    for(var i = 0; i < submenuitems.length; i++){
      submenuitems[i].classList.remove('active')
    }

    for(var i = 0; i < this.submenus.length; i++){
      this.closeSubmenu(this.submenus[i]);
    }

    if(this.menu.classList.contains('active')){
      this.menu.classList.remove('active')
      document.body.classList.remove('am-menu-active');
      document.body.classList.remove('menu-'+ this.settings.selectors.menu_id + '-active');

      if(this.settings.options.disable_scroll)
      document.body.classList.remove('scroll-disabled');
    }
  }

  toggleSubmenu(submenu){
    if(!submenu.classList.contains('active'))
    this.can_open_multiple(this.closest(submenu, submenu.className));
    submenu.classList.toggle('active');
  }

  openSubmenu(submenu){
    this.can_open_multiple();
    submenu.classList.add('active')
  }

  closeSubmenu(submenu){
    submenu.classList.remove('active')
  }

  onTouchStart (e) {
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
  }

  onTouchMove (evt) {
    if ( ! this.xDown || ! this.yDown ) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      if ( xDiff > 0 ) {
        this.settings.events.swipeLeft();
      } else {
        this.settings.events.swipeRight();
      }
    } else {
      if ( yDiff > 0 ) {
        this.settings.events.swipeUp();
      } else {
        this.settings.events.swipeDown();
      }
    }

    /* reset values */
    this.xDown = null;
    this.yDown = null;
  }

  can_open_multiple(parentMenu){
    for(var i = 0; i < this.submenus.length; i++){
      if(parentMenu != this.submenus[i])
      this.closeSubmenu(this.submenus[i]);
    }
  }

  initSubmenu(submenu) {
    submenu.classList.add('active');

    for (var i = 0; i< this.menuitems.length; i++){
      if(this.closest(this.menuitems[i], 'sub-menu'))
      var elHeight = this.menuitems[i].offsetHeight;
      elHeight += parseInt(window.getComputedStyle(this.menuitems[i]).getPropertyValue('margin-top'));
      elHeight += parseInt(window.getComputedStyle(this.menuitems[i]).getPropertyValue('margin-bottom'));

      this.menuitems[i].parentNode.style.maxHeight = elHeight + "px"
    }

    submenu.classList.remove('active');
  }

  closest(el, classname) {
    if(el.parentNode && el.parentNode.className){
      if(el.parentNode.className.indexOf(classname) != -1){
        return el.parentNode;
      }
      else{
        return this.closest(el.parentNode, classname);
      }
    }
    else{
      return false;
    }
  }

  documentClick (e){
    var hide = true;

    for(var i = 0; i < e.path.length; i++ ){
      if(
        e.path[i].id == this.settings.selectors.menu_id ||
        e.path[i].classList && e.path[i].classList.contains('menu-toggle-button')
      )
      hide = false;
    }

    if(hide) this.close();
  }

  registerEventAll (elements, eventname, callback){
    if(elements.length)
    for(var i=0; i < elements.length; i++){
      elements[i].addEventListener(eventname, callback.bind(this));
    }
  }

  initHandles(){
    var menuitems = this.menu.querySelectorAll('.am-has-children');
    for (var i=0; i < menuitems.length; i++){
      var handle = document.createElement('span');
      handle.classList.add('handle');
      menuitems[i].insertBefore(handle, menuitems[i].children[1]);
    }
  }

}
