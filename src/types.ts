import { Request, Response } from "express"

export declare type Page<T = any> = (props?: T, context?: PageContext, ...extra: any[]) => PageContent | Promise<PageContent>;

export declare type PageContent = {
  head?: string;
  html: string;
}

export declare type PageContext = {
  req: Request,
  res: Response,
  extra?: Record<string, any>
}