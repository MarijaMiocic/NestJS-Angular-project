import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT token se preuzima iz Authorization headera
      ignoreExpiration: false, // Ako token istekne, ne dozvoljava se pristup
      secretOrKey: process.env.JWT_SECRET, // Tajni ključ za verifikaciju JWT-a, mora biti isti kao u auth.module.ts
    });
  }

  // Ova metoda se poziva nakon što se token uspješno validira
  async validate(payload: any) {
    // Ovdje vraćamo korisničke podatke koji će biti dostupni u req.user
    return { userId: payload.sub, email: payload.email };
  }
}
