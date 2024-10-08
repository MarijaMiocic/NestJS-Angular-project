import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: User) {
    return this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    console.log('Login request received:', email);  // Ovo bi se trebalo ispisati kada se login ruta pozove
    return this.authService.login(email, password);
  }
}
