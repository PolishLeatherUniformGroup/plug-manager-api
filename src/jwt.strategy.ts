import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';

const config = dotenv.config({ path: ['.env', '.env.local'] });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor() {
        super({

            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${config.parsed.AUTH0_ISSUER_URL}.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: `${config.parsed.AUTH0_AUDIENCE}`,
            issuer: `${config.parsed.AUTH0_ISSUER_URL}`,
            algorithms: ['RS256'],
        });
    }


    validate(payload: any) {
        return payload;
    }
}
