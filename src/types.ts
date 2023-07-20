import { Request, Response } from "express"

type StringLiteral = string;

type TemplateValue = StringLiteral | StringLiteral[];

export interface Page  {
  (props?: Record<string, any>, context?: PageContext): PageContent | Promise<PageContent> | void;
}

export declare type PageContent = {
  htmlAttributes?: TemplateValue;
  head?: TemplateValue;
  bodyAttributes?: TemplateValue;
  body?: TemplateValue;
  footer?: TemplateValue;
}

export declare type PageContext = {
  req: Request,
  res: Response,
  extra?: Record<string, any>
}