import { Request, Response } from 'express';

type StringLiteral = string;

type TemplateValue = StringLiteral | StringLiteral[];

export interface Page {
  (props?: Record<string, unknown>, context?: PageContext):
    | PageContent
    | string
    | Promise<PageContent | string>
    | void;
}

export declare type PageContent = {
  head?: TemplateValue;
  body?: TemplateValue;
  footer?: TemplateValue;
};

export declare type PageContext = {
  req: Request;
  res: Response;
  extra?: Record<string, unknown>;
};
