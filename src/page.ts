import { Page, PageContent, PageContext } from "./types";

export async function definePage(page: Page) {
  return async (params: Record<string, any>, context?: PageContext): Promise<PageContent> => {
    const content = await Promise.resolve(page(params, context));
    return { ...content, html: content.html + '<b>Injetado</b>' }
  }
}

export async function defineAuthPage(page: Page) {
  return async (params: Record<string, any>, context?: PageContext): Promise<PageContent> => {
    // Verify token from context.req
    const content = await Promise.resolve(page(params, { ...context, extra: context.req.headers }));
    return content
  }
}
