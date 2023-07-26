import { Request, Response } from 'express';

export declare type PageContent =
  | string
  | (() => string)
  | Promise<() => string>
  | void;

export declare type PageParams = {
  params: Record<string, unknown>;
  query: Record<string, unknown>;
};

export declare type PageContext = {
  req: Request;
  res: Response;
  extra?: Record<string, unknown>;
};

export type Page = (params?: PageParams, context?: PageContext) => PageContent;
