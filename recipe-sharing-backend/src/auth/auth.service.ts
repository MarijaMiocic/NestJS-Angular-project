import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // Metoda za registraciju novog korisnika
  async signUp(user: User): Promise<any> {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Generiranje hasha
    console.log('Hashed password:', hashedPassword); // Provjeri hash lozinke
    const newUser = { ...user, password: hashedPassword };
    return this.usersService.create(newUser); // Spremi hashiranu lozinku u bazu
  }

  // Metoda za prijavu korisnika
  async login(email: string, password: string) {
    console.log('Attempting login with email:', email);
  
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      console.log('User not found for email:', email);
      throw new UnauthorizedException('Invalid credentials');
    }
  
    console.log('User found:', user);
    
    console.log('Unesena lozinka:', password); 
    console.log('Pohranjena hashirana lozinka:', user.password);
  
    // Provjeri ako lozinka odgovara hashiranoj lozinki u bazi
    const passwordMatches = await bcrypt.compare(password, user.password);
    console.log('Password matches:', passwordMatches);
  
    if (passwordMatches) {
      const payload = { email: user.email, sub: user.id };
      console.log('JWT Secret in AuthService:', process.env.JWT_SECRET);
  
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  
    console.log('Invalid credentials for email:', email);
    throw new UnauthorizedException('Invalid credentials');
  }

  // Metoda za validaciju korisnika (može se koristiti za autentifikaciju)
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    // Provjera ako je lozinka ispravna
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;  // Uklanjanje lozinke iz rezultata
      return result;
    }

    // Ako nije ispravno, vrati null (korisnik nije validiran)
    return null;
  }
}
