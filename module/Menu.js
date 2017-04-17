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
    this.menuitems = this.menu.querySelectorAll(selectors.menuitem + ' a');
    this.submenus = this.menu.querySelectorAll(selectors.submenu);

    if(this.menuitems.length)
    for(var i=0; i < this.menuitems.length; i++){
      this.menuitems[i].addEventListener("click", this.onMenuItemClick.bind(this));
    }

    if(this.submenus.length)
    for(var i=0; i < this.submenus.length; i++){
      this.calculateMaxHeight(this.submenus[i]);
    }

    // init toggleButtons
    this.toggleButtons = document.querySelectorAll(selectors.toggle_button);
    if(this.toggleButtons.length)
    for(var i=0; i < this.toggleButtons.length; i++){
      this.toggleButtons[i].addEventListener("click", this.toggle.bind(this));
    }

    // init openButtons
    this.openButtons = document.querySelectorAll(selectors.open_button);
    if(this.openButtons.length)
    for(var i=0; i < this.openButtons.length; i++){
      this.openButtons[i].addEventListener("click", this.open.bind(this));
    }

    // init closeButtons
    this.closeButtons = document.querySelectorAll(selectors.close_button);
    if(this.closeButtons.length)
    for(var i=0; i < this.closeButtons.length; i++){
      this.closeButtons[i].addEventListener("click", this.close.bind(this));
    }

    //init swiping
    document.addEventListener('touchstart', this.onTouchStart.bind(this), false);
    document.addEventListener('touchmove', this.onTouchMove.bind(this), false);

    document.addEventListener('mousedown', function(e){
      var hide = true; //this.menu.classList.contains('active');
      //if(!hide) return;

      for(var i = 0; i < e.path.length; i++ ){
        if(
          e.path[i].id == this.settings.selectors.menu_id ||
          e.path[i].classList && e.path[i].classList.contains('menu-toggle-button')
        )
        hide = false;
      }

      if(hide) this.close();
    }.bind(this))
  }

  config (args = {}) {
    var defaultConfig = this.settings || {
      submenu:{
        can_open_multiple: false,
      },
      selectors:{
        menu_id: 'main-menu',
        menuitem: 'li',
        submenu: '.menu-item > ul',
        toggle_button: '.menu-toggle-button',
        open_button: '.menu-open-button',
        close_button: '.menu-close-button',
      }
    }

    for (var setting in defaultConfig){
      if(args[setting]) defaultConfig[setting] = args[setting];
    }

    this.settings = defaultConfig;
    console.log("Config::", this.settings);
    return this;
  }

  onMenuItemClick (e){
    var submenu = e.target.parentNode.querySelector(this.settings.selectors.submenu);
    if(!submenu) {
      this.close();
      return;
    }

    e.preventDefault();
    this.toggleSubmenu(submenu);
  }

  toggle(){
    this.menu.classList.toggle('active')
    document.body.classList.toggle('scroll-disabled');
    document.body.classList.toggle('menu-open');
    if(!this.menu.classList.contains('active')){
      for(var i = 0; i < this.submenus.length; i++){
        this.closeSubmenu(this.submenus[i]);
      }
    }
  }

  open(){
    this.menu.classList.add('active')
    document.body.classList.add('scroll-disabled');
    document.body.classList.add('menu-open');
  }

  close(){
    for(var i = 0; i < this.submenus.length; i++){
      this.closeSubmenu(this.submenus[i]);
    }
    this.menu.classList.remove('active')
    document.body.classList.remove('scroll-disabled');
    document.body.classList.remove('menu-open');
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
        this.onSwipeLeft();
      } else {
        this.onSwipeRight();
      }
    } else {
      if ( yDiff > 0 ) {
        this.onSwipeUp();
      } else {
        this.onSwipeDown();
      }
    }

    /* reset values */
    this.xDown = null;
    this.yDown = null;
  }

  onSwipeLeft(){
    this.close();
  }

  onSwipeRight(){
    this.open();
  }

  onSwipeUp(){}

  onSwipeDown(){}

  can_open_multiple(parentMenu){
    if(!this.settings.submenu.can_open_multiple){
      for(var i = 0; i < this.submenus.length; i++){
        if(parentMenu != this.submenus[i])
          this.closeSubmenu(this.submenus[i]);
      }
    }
  }

  calculateMaxHeight(submenu) {
    submenu.classList.add('active');
    var menuitems = submenu.children;
    for (var i = 0; i< this.menuitems.length; i++){
      if(this.closest(this.menuitems[i], 'sub-menu'))
      this.menuitems[i].parentNode.style.maxHeight = this.menuitems[i].clientHeight + "px"
    }
    submenu.classList.remove('active');
    //submenu.style.maxHeight = menuitems.length*menuitems[0].clientHeight + "px";
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
}
