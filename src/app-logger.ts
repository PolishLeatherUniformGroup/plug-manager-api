import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, path: url } = request;
        const userAgent = request.get('user-agent') || '';
        const body = JSON.stringify(request.body);

        response.on('close', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            this.logger.debug(
                `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} : ${body}`,
            );
        });

        next();
    }
}