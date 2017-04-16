# Menu Package for Webpack.

** NOTE: Package is in development.**

### Why this package
There already are a lot of menu packages available across the web. So why build another one? Well, A lot of packages focus on a specific menu layout, are at some point incomplete or not flexibel enough. We would like to change that and create a single menu package that gives front-end developers a set of predefined, responsive menu layouts to start their project with.

** goals **
+ Create up to 5 (or more) menu themes (SCSS)
+ Swich themes based on screen resolution (SCSS)
+ Configurable selectors for menu, menu-item, sub-menu, toggle-button etc.
+ Create your own menu themes
+ Optimize Swipe event usage

** TODO **
+ Optimize package and more..

** EXAMPLE: [menudemo.rehabproject.nl](http://menudemo.rehabproject.nl) **

ps. This is my first NPM Package.
Please let me know if you've got some tips!

## How to use


### Installation

##### Install from npm

```
npm install advanced-menus --save-dev
```

##### Include Javascript (ES6)

```javascript

	const Menu = require('advanced-menus');

    //defaultconfig
    var  config = {
      selectors:{
        menu_id: 'main-menu',
        menuitem: 'li',
        submenu: '.menu-item > ul',
        toggle_button: '.menu-toggle-button',
        open_button: '.menu-open-button',
        close_button: '.menu-close-button',
    }

    //config not required
    var mainmenu = new Menu(config);

```

##### Include styles (SASS)

```cs
@import "node_modules/advanced-menus/scss/menu";

/*
	Available themes:
    - aside-left
    - aside-right
    - plain-horizontal
*/

$menu-config: (
  aside-left: (
    min:0px,
    max:750px,
    autohide: 750px
  ),
  aside-right: (
    min:750px,
    max:1024px,
  ),
  plain-horizontal: (
    min:1024px
  )
)

@include menu( "#main-menu", $menu-config);

/*
=============================================
USEFUL MIXINS
=============================================
*/
// menu-breakpoint :
// Use this mixin to add styles at the specified menu theme breakpoint

@include menu-breakpoint($theme){
  //styles
}

/*
=============================================
Custom themes
=============================================
*/
// ./themes/_theme-name.scss

$theme: "theme-name";
$config: map-get($menu-config, $theme);

%menu-theme-#{$theme}{
  @include menu-breakpoint($theme){
	// your styles here.
  }
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
