!function(e){function t(n){if(s[n])return s[n].exports;var i=s[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var s={};t.m=e,t.c=s,t.i=function(e){return e},t.d=function(e,s,n){t.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,s){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}(),u=function(){function e(t){n(this,e),this.config(t);var s=this.settings.selectors;if(this.menu=document.getElementById(s.menu_id),!this.menu)return void console.error("unable to find the menu with selector: "+s.menu_id);if(this.menuitems=this.menu.querySelectorAll(s.menuitem+" a"),this.submenus=this.menu.querySelectorAll(s.submenu),this.submenus.length)for(var i=0;i<this.submenus.length;i++)this.submenus[i].parentNode.classList.add("am-has-children");var o;if(this.settings.options.parent_clickable?(this.initHandles(),o=this.menu.querySelectorAll(s.menuitem+" .handle")):o=this.menu.querySelectorAll(s.menuitem+" a"),this.registerEventAll(o,"click",this.onMenuItemClick),this.submenus.length)for(var i=0;i<this.submenus.length;i++)this.initSubmenu(this.submenus[i]);this.toggleButtons=document.querySelectorAll(s.toggle_button),this.registerEventAll(this.toggleButtons,"click",this.toggle),this.openButtons=document.querySelectorAll(s.open_button),this.registerEventAll(this.openButtons,"click",this.open),this.closeButtons=document.querySelectorAll(s.close_button),this.registerEventAll(this.closeButtons,"click",this.close),document.addEventListener("touchstart",this.onTouchStart.bind(this),!1),document.addEventListener("touchmove",this.onTouchMove.bind(this),!1),this.settings.options.autoclose&&document.addEventListener("mousedown",this.documentClick.bind(this))}return o(e,[{key:"config",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this.settings||{options:{disable_page_scroll:!1,autoclose:!0,parent_clickable:!1},events:{swipeLeft:function(){},swipeRight:function(){},swipeUp:function(){},swipeDown:function(){}},selectors:{menu_id:"main-menu",menuitem:"li",submenu:"li > ul",toggle_button:!1,open_button:!1,close_button:!1}};for(var s in t)if("object"==i(t[s])&&e[s])for(var n in t[s])void 0!==e[s][n]&&(t[s][n]=e[s][n]);return this.settings=t,this}},{key:"onMenuItemClick",value:function(e){for(var t=e.target.parentNode.classList.contains("active"),s=e.target.parentNode.parentNode.querySelectorAll(".am-has-children"),n=0;n<s.length;n++)s[n].classList.remove("active");t||e.target.parentNode.classList.add("active");var i=e.target.parentNode.querySelector(this.settings.selectors.submenu);if(!i)return void this.close();e.preventDefault(),e.target.parentNode.removeAttribute("style"),this.toggleSubmenu(i)}},{key:"toggle",value:function(){if(this.menu.classList.toggle("active"),document.body.classList.toggle("am-menu-active"),document.body.classList.toggle("menu-"+this.settings.selectors.menu_id+"-active"),this.settings.options.disable_page_scroll&&document.body.classList.toggle("scroll-disabled"),!this.menu.classList.contains("active"))for(var e=0;e<this.submenus.length;e++)this.closeSubmenu(this.submenus[e])}},{key:"open",value:function(){this.menu.classList.add("active"),document.body.classList.add("am-menu-active"),document.body.classList.add("menu-"+this.settings.selectors.menu_id+"-active"),this.settings.options.disable_page_scroll&&document.body.classList.add("scroll-disabled")}},{key:"close",value:function(){for(var e=this.menu.querySelectorAll(".am-has-children"),t=0;t<e.length;t++)e[t].classList.remove("active");for(var t=0;t<this.submenus.length;t++)this.closeSubmenu(this.submenus[t]);this.menu.classList.contains("active")&&(this.menu.classList.remove("active"),document.body.classList.remove("am-menu-active"),document.body.classList.remove("menu-"+this.settings.selectors.menu_id+"-active"),this.settings.options.disable_page_scroll&&document.body.classList.remove("scroll-disabled"))}},{key:"toggleSubmenu",value:function(e){e.classList.contains("active")||this.can_open_multiple(this.closest(e,e.className)),e.classList.toggle("active")}},{key:"openSubmenu",value:function(e){this.can_open_multiple(),e.classList.add("active")}},{key:"closeSubmenu",value:function(e){e.classList.remove("active")}},{key:"onTouchStart",value:function(e){this.xDown=e.touches[0].clientX,this.yDown=e.touches[0].clientY}},{key:"onTouchMove",value:function(e){if(this.xDown&&this.yDown){var t=e.touches[0].clientX,s=e.touches[0].clientY,n=this.xDown-t,i=this.yDown-s;Math.abs(n)>Math.abs(i)?n>0?this.settings.events.swipeLeft(this,e):this.settings.events.swipeRight(this,e):i>0?this.settings.events.swipeUp(this,e):this.settings.events.swipeDown(this,e),this.xDown=null,this.yDown=null}}},{key:"can_open_multiple",value:function(e){for(var t=0;t<this.submenus.length;t++)e!=this.submenus[t]&&this.closeSubmenu(this.submenus[t])}},{key:"initSubmenu",value:function(e){e.classList.add("active");for(var t=0;t<this.menuitems.length;t++){if(this.closest(this.menuitems[t],"sub-menu"))var s=this.menuitems[t].offsetHeight;s+=parseInt(window.getComputedStyle(this.menuitems[t]).getPropertyValue("margin-top")),s+=parseInt(window.getComputedStyle(this.menuitems[t]).getPropertyValue("margin-bottom")),this.menuitems[t].parentNode.style.maxHeight=s+"px"}e.classList.remove("active")}},{key:"closest",value:function(e,t){return!(!e.parentNode||!e.parentNode.className)&&(-1!=e.parentNode.className.indexOf(t)?e.parentNode:this.closest(e.parentNode,t))}},{key:"documentClick",value:function(e){for(var t=!0,s=0;s<e.path.length;s++)(e.path[s].id==this.settings.selectors.menu_id||e.path[s].classList&&e.path[s].classList.contains("menu-toggle-button"))&&(t=!1);t&&this.close()}},{key:"registerEventAll",value:function(e,t,s){if(e.length)for(var n=0;n<e.length;n++)e[n].addEventListener(t,s.bind(this))}},{key:"initHandles",value:function(){for(var e=this.menu.querySelectorAll(".am-has-children"),t=0;t<e.length;t++){var s=document.createElement("span");s.classList.add("handle"),e[t].insertBefore(s,e[t].children[1])}}}]),e}();t.default=u},function(e,t,s){"use strict";var n=s(0);e.exports=n.default}]);