# Menu Package for Webpack.

**NOTE: Package is in development.**

### Why this package
There already are a lot of menu packages available across the web. So why build another one? Well, A lot of packages focus on a specific menu layout, are at some point incomplete or not flexibel enough. We would like to change that and create a single menu package that gives front-end developers a set of predefined, responsive menu layouts to start their project with.

**DONE**

+ Change menu based on resolution SASS only
+ Create your own menu themes
+ Customizable selectors
+ Basic swipe handling

**TODO**
+ Optimize package
+ Create up to 5 (or more) menu themes (SCSS)
+ Optimize Swipe event usage
+ Optimize Demo page
+ Optimize documentation
+ Create ready to use prebuild package files.

**EXAMPLE: [menudemo.rehabproject.nl](http://menudemo.rehabproject.nl)**

ps. Like to join the fun? contact us at info@code.rehab;

## How to use


### Installation

##### Install from npm

```
npm install advanced-menus --save-dev
```

##### Include Javascript (ES6)

```javascript

/*
DEFAULT CONFIG

{
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

*/

	const Menu = require('advanced-menus');

    //menu config;
    var config = {
		  selectors:{
		    toggle_button: ".menu-toggle-button",
		  },
		  options:{
		    disable_scroll: true,
		    use_handles:true,
		  },
		  events:{
		    swipeLeft: function(){
		      menu.close();
		    },
		    swipeRight: function(){
		      menu.open();
		    }
		  }
		}

    //config not required
    var mainmenu = new Menu(config);

```

##### Include styles (SASS)

```cs

/*
	Available themes:
    - aside-left
    - aside-right
    - plain-horizontal
	- dropdown
*/

$registered-menus: (
	main-menu: (
		selector:"#main-menu",
		themes:(
			aside-left: (
				min:0px,
				max:750px,
				autohide: 750px
			),
			aside-right: (
				min:750px,
				max:1024px,
			),
			plain-horizontal: (min:1024px)
		)
	)
	//, another menu
	//, another menu
);

@import "node_modules/advanced-menus/scss/menu";
@include generate-menus();

/*
=============================================
USEFUL MIXINS
=============================================
*/
// menu-breakpoint :
// Use this mixin to add styles at the specified menu theme breakpoint

@include menu-breakpoint($menu, $theme){
  //styles
}

/*
=============================================
Custom themes
=============================================
*/
// ./themes/_theme-name.scss

@include register_menu_theme($some-theme-name)
	// your styles here.
}

//probably needs some more work..
//hides menu at certain resolution;
@include menu-autohide($theme-name){
	// initial styles to hide menu.
}

```

##### Example html

``` html
<nav id="main-menu">
  <ul class='menu'>
    <li class="menu-item">
      <a href="#item1">Item 1</a>
      <ul class='sub-menu'>
        <li class="menu-item"><a href="#item1">Item 1</a></li>
        <li class="menu-item">
          <a href="#item2">Item 2</a>
          <ul class='sub-menu'>
            <li class="menu-item"><a href="#item1">Item 1</a></li>
            <li class="menu-item"><a href="#item2">Item 2</a></li>
            <li class="menu-item"><a href="#item3">Item 3</a></li>
            <li class="menu-item"><a href="#item4">Item 4</a></li>
            <li class="menu-item"><a href="#item5">Item 5</a></li>
          </ul>
        </li>
        <li class="menu-item"><a href="#item1">Item 3</a></li>
        <li class="menu-item"><a href="#item2">Item 4</a></li>
        <li class="menu-item"><a href="#item3">Item 5</a></li>
      </ul>
    </li>
    <li class="menu-item">
      <a href="#item2">Item 2</a>
      <ul class='sub-menu'>
        <li class="menu-item"><a href="#item1">Item 1</a></li>
        <li class="menu-item"><a href="#item2">Item 2</a></li>
      </ul>
    </li>
    <li class="menu-item"><a href="#item3">Item 3</a></li>
    <li class="menu-item"><a href="#item4">Item 4</a></li>
  </ul>
</nav>

<button class="menu-toggle-button">=</button>

```
