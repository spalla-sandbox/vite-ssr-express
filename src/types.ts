import { Request, Response } from 'express';
import React from 'react';
import type { QueryObject } from 'ufo';

export declare type PageContent =
  | (() => React.JSX.Element)
  | Promise<() => React.JSX.Element>;

export declare type PageParams<T> = {
  params: T;
  query: QueryObject;
};

export declare type PageContext = {
  req: Request;
  res: Response;
  extra?: Record<string, unknown>;
};

export type Page<T> = (
  params?: PageParams<T>,
  context?: PageContext,
) => PageContent;
