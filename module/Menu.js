export default class Menu {
  constructor(args){
    this.config(args);
    var selectors = this.settings.selectors;

    //init Menu
    this.menu = document.querySelector(selectors.menu);
    if(!this.menu) {
      console.error("unable to find the menu with selector: " + selectors.menu);
      return;
    };
    this.menuitems = this.menu.querySelectorAll(selectors.menuitem + ' a');
    this.submenus = this.menu.querySelectorAll(selectors.submenu);

    if(this.menuitems.length)
    for(var i=0; i < this.menuitems.length; i++){
      this.menuitems[i].addEventListener("click", this.onMenuItemClick.bind(this));
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

    console.log(this);
  }

  config (args = {}) {
    var defaultConfig = this.settings || {
      submenu:{
        can_open_multiple: false,
      },
      selectors:{
        menu: '#main-menu',
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
    if(!submenu) return;

    e.preventDefault();
    this.toggleSubmenu(submenu);
  }

  toggle(){
    this.menu.classList.toggle('active')
    document.body.classList.toggle('scroll-disabled');
    if(!this.menu.classList.contains('active')){
      for(var i = 0; i < this.submenus.length; i++){
        this.closeSubmenu(this.submenus[i]);
      }
    }
  }

  open(){
    this.menu.classList.add('active')
    document.body.classList.add('scroll-disabled');
  }

  close(){
    for(var i = 0; i < this.submenus.length; i++){
      this.closeSubmenu(this.submenus[i]);
    }
    this.menu.classList.remove('active')
    document.body.classList.remove('scroll-disabled');
  }

  toggleSubmenu(submenu){
    this.can_open_multiple();
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

  can_open_multiple(){
    if(!this.settings.submenu.can_open_multiple){
      for(var i = 0; i < this.submenus.length; i++){
        this.closeSubmenu(this.submenus[i]);
      }
    }
  }
}
