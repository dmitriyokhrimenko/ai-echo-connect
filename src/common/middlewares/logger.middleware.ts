import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as os from 'os';
import { LogHelper } from '../helpers/log.helper';

const ENV = process.env.NODE_ENV || 'development';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    const { method, originalUrl, headers, query, body } = req;

    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = headers['user-agent'] || 'Unknown';
    const user = (req as any).user?.id || 'Guest';

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;

      this.logger.verbose(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          method,
          url: originalUrl,
          statusCode,
          duration: `${duration}ms`,
          user,
          ip,
          userAgent,
          env: ENV,
          query,
          body: LogHelper.sanitize(body),
          host: os.hostname(),
        }),
      );
    });

    next();
  }
}
