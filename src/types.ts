import { Request, Response } from 'express';

export declare type PageContent =
  | string
  | (() => string)
  | Promise<() => string>
  | void;

export interface Page {
  (props?: Record<string, unknown>, context?: PageContext): PageContent;
}

export declare type PageContext = {
  req: Request;
  res: Response;
  extra?: Record<string, unknown>;
};
