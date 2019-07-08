import { Menu } from "../menu";
import { generateConfig } from "../config";

// @ts-ignore
import html from "./resources/menu.html";

const config = generateConfig({});
const innerhtml = html;

describe("Test menu capabilities", () => {
  test("Check if returned element is of type html", () => {
    document.body.innerHTML = html;

    const expected = new Menu().menu;
    expect(expected).toBeInstanceOf(HTMLElement);
  });

  test("Check if submenus exist", () => {
    document.body.innerHTML = html;

    const expected = new Menu().submenus;
    expect(expected).toBeInstanceOf(NodeList);
  });
});
