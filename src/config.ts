import { Menu } from "./menu";

export interface MenuConfig {
  options: MenuOptions;
  events: MenuEvents;
  selectors: MenuSelectors;
}

export interface MenuEvents {
  swipeLeft(menu: Menu, e: TouchEvent): void;
  swipeRight(menu: Menu, e: TouchEvent): void;
  swipeUp(menu: Menu, e: TouchEvent): void;
  swipeDown(menu: Menu, e: TouchEvent): void;
}

export interface MenuOptions {
  disable_page_scroll: boolean;
  autoclose: boolean;
  parent_clickable: boolean;
}

export interface MenuSelectors {
  menu_id: string;
  menuitem: string;
  submenu: string;
  toggle_button: any;
  open_button: any;
  close_button: any;
}

export function generateConfig(config: Partial<MenuConfig>) {
  return {
    options: {
      disable_page_scroll: false,
      autoclose: true,
      parent_clickable: false,
      ...config.options
    },
    events: {
      swipeLeft: () => {},
      swipeRight: () => {},
      swipeUp: () => {},
      swipeDown: () => {},
      ...config.events
    },
    selectors: {
      menu_id: "main-menu",
      menuitem: "li",
      submenu: "li > ul",
      toggle_button: false,
      open_button: false,
      close_button: false,
      ...config.selectors
    }
  };
}
