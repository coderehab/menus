export default {

	swipeOffsetX: 0,
	swipeOffsetY: 0,

	init (args){
		args = args || {
			menu_selector: 'header#main nav#main-menu',
			menu_trigger_selector: 'header#main .toggle-menu',
			tap_hide_area: 'header#main .tap-hide-area',
		};

		var _this = this;
		this.menu = document.querySelector(args.menu_selector)
		this.trigger = document.querySelector(args.menu_trigger_selector)
		this.outside = document.querySelector(args.tap_hide_area)
		this.itemsWithSubmenu = this.menu.querySelectorAll('.menu-item-has-children')

		if(this.outside) this.outside.onclick = this.hideMenu.bind(this);
		if(this.trigger) this.trigger.onclick = this.toggleMenu.bind(this);

		if(this.menu){
			document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
			document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
			if(window.innerWidth > 767) {
				document.addEventListener('mousedown', this.closeAllSubMenus.bind(this), false);
				document.addEventListener('touchstart', this.closeAllSubMenus.bind(this), false);
			}
		}

		if(this.itemsWithSubmenu.length){
			for (var i = 0; i < this.itemsWithSubmenu.length; i++) {
				_this.itemsWithSubmenu[i].querySelector("* > a").addEventListener('click', function(e){
					e.preventDefault();
					var submenu = e.target.parentNode.querySelector('.sub-menu');
					var items = e.target.parentNode.querySelectorAll('.menu-item');
					submenu.style.maxHeight = (items.length * 60) + "px";
					e.target.parentNode.classList.toggle('active');
				}, false);
			}
		}
	},

	closeAllSubMenus (e) {
		if(!e.target.parentNode.parentNode.classList.contains('sub-menu')){
			for (var i = 0; i < this.itemsWithSubmenu.length; i++) {
				this.itemsWithSubmenu[i].classList.remove('active');
			}
		}
	},

	toggleMenu () {
		if(this.menu){
			this.menu.classList.toggle('visible')
			document.body.classList.toggle('scroll-disabled');
		}
	},

	hideMenu () {
		if(this.menu){
			this.menu.classList.remove('visible')
			document.body.classList.remove('scroll-disabled');
		}
	},

	showMenu () {
		if(this.menu){
			this.menu.classList.add('visible')
			document.body.classList.add('scroll-disabled');
		}
	},

	onSwipeLeft () {
		this.hideMenu();
	},

	onSwipeRight () {
		this.showMenu();
	},

	onSwipeUp () {

	},

	onSwipeDown () {

	},

	handleTouchStart (evt) {
		this.xDown = evt.touches[0].clientX;
		this.yDown = evt.touches[0].clientY;
	},

	handleTouchMove (evt) {
		if ( ! this.xDown || ! this.yDown ) {
			return;
		}

		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;

		var xDiff = this.xDown - xUp;
		var yDiff = this.yDown - yUp;

		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
			if ( xDiff > this.swipeOffsetX ) {
				this.onSwipeLeft();
			} else {
				this.onSwipeRight();
			}
		} else {
			if ( yDiff > this.swipeOffsetY ) {
				this.onSwipeUp();
			} else {
				this.onSwipeDown();
			}
		}

		/* reset values */
		this.xDown = null;
		this.yDown = null;
	}
}
