import {
  MenuConfig,
  generateConfig,
  MenuSelectors,
  MenuOptions
} from "./config";

export class Menu {
  public config: MenuConfig;
  public menu: HTMLElement;
  public selectors: MenuSelectors;
  public options: MenuOptions;
  public submenus: NodeListOf<HTMLElement>;
  public menuitems: NodeListOf<HTMLElement>;
  public toggleButtons: NodeListOf<Element>;
  public openButtons: NodeListOf<Element>;
  public closeButtons: NodeListOf<Element>;
  public xDown: any;
  public yDown: any;
  public xUp: any;
  public yUp: any;

  constructor(cfg: Partial<MenuConfig> = {}) {
    this.config = generateConfig(cfg);
    this.selectors = this.config.selectors;
    this.options = this.config.options;

    // Initialize menu
    const menu = document.getElementById(this.selectors.menu_id);
    if (!menu) {
      throw new Error(
        "unable to find the menu with selector: " + this.selectors.menu_id
      );
    }

    this.menu = menu;

    // Retrieve all menu items
    this.menuitems = this.menu.querySelectorAll(this.selectors.menuitem + " a");

    // Initialize submenus
    this.submenus = this.menu.querySelectorAll(this.selectors.submenu);

    this.submenus.forEach(submenu => {
      if (submenu.parentElement) {
        submenu.parentElement.classList.add("am-has-children");
      }
    });

    //Initialize menuitems
    let handles;
    if (this.options.parent_clickable) {
      this.initHandles();
      handles = this.menu.querySelectorAll(
        this.selectors.menuitem + " .handle"
      );
    } else {
      handles = this.menu.querySelectorAll(this.selectors.menuitem + " a");
    }

    this.registerEventAll(handles, "click", this.onMenuItemClick);

    if (this.submenus.length)
      this.submenus.forEach(submenu => {
        if (submenu.parentElement) {
          this.initSubmenu(submenu);
        }
      });

    // init toggleButtons
    this.toggleButtons = document.querySelectorAll(
      this.selectors.toggle_button
    );
    this.registerEventAll(this.toggleButtons, "click", this.toggle);

    // init openButtons
    this.openButtons = document.querySelectorAll(this.selectors.open_button);
    this.registerEventAll(this.openButtons, "click", this.open);

    // init closeButtons
    this.closeButtons = document.querySelectorAll(this.selectors.close_button);
    this.registerEventAll(this.closeButtons, "click", this.close);

    //init swiping
    document.addEventListener(
      "touchstart",
      this.onTouchStart.bind(this),
      false
    );
    document.addEventListener("touchmove", this.onTouchMove.bind(this), false);

    // Onderstaand triggert bij het klikken op het menu icon een dubbele interactie
    // want er gaat een mousedown af en op het menu zelf zit een toggle, TODO FIX

    // //document click
    if (this.config.options.autoclose)
      document.addEventListener("mousedown", this.documentClick.bind(this));
  }

  onMenuItemClick(e: any) {
    const is_active = e.target.parentNode.classList.contains("active");
    const submenuitems: NodeListOf<
      HTMLElement
    > = e.target.parentElement.parentElement.querySelectorAll(
      ".am-has-children"
    );
    submenuitems.forEach(submenuitem => {
      if (submenuitem.parentElement) {
        submenuitem.parentElement.classList.toggle("active");
      }
    });

    if (!is_active) e.target.parentElement.classList.add("active");

    const submenu = e.target.parentElement.querySelector(
      this.selectors.submenu
    );
    this.toggleSubmenu(submenu);

    if (!submenu) {
      this.close();
      return;
    }

    e.preventDefault();
    e.target.parentNode.removeAttribute("style");
  }

  toggle() {
    this.menu.classList.toggle("active");
    document.body.classList.toggle("am-menu-active");
    document.body.classList.toggle(
      "menu-" + this.config.selectors.menu_id + "-active"
    );

    if (this.config.options.disable_page_scroll)
      document.body.classList.toggle("scroll-disabled");

    if (!this.menu.classList.contains("active")) {
      this.submenus.forEach(submenu => {
        this.closeSubmenu(submenu);
      });
    }
  }

  open() {
    this.menu.classList.add("active");
    document.body.classList.add("am-menu-active");
    document.body.classList.add(
      "menu-" + this.config.selectors.menu_id + "-active"
    );

    if (this.config.options.disable_page_scroll)
      document.body.classList.add("scroll-disabled");
  }

  close() {
    const submenuitems: NodeListOf<HTMLElement> = this.menu.querySelectorAll(
      ".am-has-children"
    );

    submenuitems.forEach(submenu => {
      submenu.classList.remove("active");
      this.closeSubmenu(submenu);
    });

    if (this.menu.classList.contains("active")) {
      this.menu.classList.remove("active");
      document.body.classList.remove("am-menu-active");
      document.body.classList.remove(
        "menu-" + this.config.selectors.menu_id + "-active"
      );

      if (this.config.options.disable_page_scroll)
        document.body.classList.remove("scroll-disabled");
    }
  }

  toggleSubmenu(submenu: HTMLElement) {
    if (!submenu.classList.contains("active"))
      this.can_open_multiple(this.closest(submenu, submenu.className));
    submenu.classList.toggle("active");
  }

  openSubmenu(submenu: HTMLElement) {
    this.can_open_multiple();
    submenu.classList.add("active");
  }

  closeSubmenu(submenu: HTMLElement) {
    submenu.classList.remove("active");
  }

  onTouchStart(e: any) {
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
  }

  onTouchMove(evt: any) {
    if (!this.xDown || !this.yDown) {
      return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = this.xDown - xUp;
    let yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        this.config.events.swipeLeft(this, evt);
      } else {
        this.config.events.swipeRight(this, evt);
      }
    } else {
      if (yDiff > 0) {
        this.config.events.swipeUp(this, evt);
      } else {
        this.config.events.swipeDown(this, evt);
      }
    }

    /* reset values */
    this.xDown = null;
    this.yDown = null;
  }

  can_open_multiple(parentMenu?: HTMLElement) {
    this.submenus.forEach(submenu => {
      if (parentMenu != submenu) this.closeSubmenu(submenu);
    });
  }

  initSubmenu(submenu: HTMLElement) {
    submenu.classList.add("active");

    this.menuitems.forEach(menuitem => {
      if (this.closest(menuitem, "sub-menu") && menuitem.parentElement) {
        let elHeight = menuitem.offsetHeight;
        elHeight += parseInt(
          window.getComputedStyle(menuitem).getPropertyValue("margin-top")
        );
        elHeight += parseInt(
          window.getComputedStyle(menuitem).getPropertyValue("margin-bottom")
        );

        menuitem.parentElement.style.maxHeight = elHeight + "px";
      }
    });

    submenu.classList.remove("active");
  }

  closest(el: any, classname: string): HTMLElement | undefined {
    if (el.parentNode && el.parentNode.className) {
      if (el.parentNode.className.indexOf(classname) != -1) {
        return el.parentNode;
      } else {
        return this.closest(el.parentNode, classname);
      }
    }
  }

  documentClick(e: any) {
    let hide = true;
    const path = e.path || e.composedPath();
    path.forEach((single_path: any) => {
      if (
        single_path.id == this.config.selectors.menu_id ||
        (single_path.classList &&
          single_path.classList.contains("menu-toggle-button"))
      ) {
        hide = false;
      }
    });

    if (hide) this.close();
  }

  registerEventAll(elements: any, eventname: string, callback: any) {
    if (elements.length) {
      elements.forEach((element: HTMLElement) => {
        element.addEventListener(eventname, callback.bind(this));
      });
    }
  }

  initHandles() {
    const menuitems = this.menu.querySelectorAll(".am-has-children");

    menuitems.forEach(menuitem => {
      const handle = document.createElement("span");
      handle.classList.add("handle");
      menuitem.insertBefore(handle, menuitem.children[1]);
    });
  }
}
