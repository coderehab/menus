import { generateConfig } from "../config";

describe("Check if config is being generated", () => {
  test("Check if generated config is returned", () => {
    const expected = generateConfig({});
    expect(expected).toEqual({
      options: {
        disable_page_scroll: false,
        autoclose: true,
        parent_clickable: false
      },
      events: {
        swipeLeft: expect.any(Function),
        swipeRight: expect.any(Function),
        swipeUp: expect.any(Function),
        swipeDown: expect.any(Function)
      },
      selectors: {
        menu_id: "main-menu",
        menuitem: "li",
        submenu: "li > ul",
        toggle_button: false,
        open_button: false,
        close_button: false
      }
    });
  });
});
