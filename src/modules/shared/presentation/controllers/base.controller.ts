/* eslint-disable @typescript-eslint/no-explicit-any */
import { asyncHandler } from '@/api/middlewares/async-handler';
import { NextFunction, Request, Response, Router } from 'express';

export abstract class BaseController {
  public readonly router: Router;
  public readonly mainRoute: string;

  constructor(mainRoute: string) {
    this.router = Router();
    this.mainRoute = mainRoute;
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;

  public getRoutes(): Router {
    return this.router;
  }

  protected handleAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return asyncHandler(fn);
  }
}
