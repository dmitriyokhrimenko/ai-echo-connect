import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

interface AppRequest extends Request {
  locale?: string;
}

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
  use(req: AppRequest, res: Response, next: NextFunction) {
    req.locale = req.headers['accept-language']?.split(',')[0] || 'en';
    next();
  }
}
