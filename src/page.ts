import { Page } from "./types";

export function definePage(page: Page) {
  return page
}

export function defineAuthPage(page: Page) {
  return definePage((props, context) => {
    return context.res.redirect('/forbidden');
  })
}
