import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity'; // Import User entiteta
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // Dodajemo ConfigModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Omogućava korištenje env varijabli globalno
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite', // Koristi SQLite kao bazu podataka
      database: process.env.DB_DATABASE || 'recipe-sharing.db',  // Učitaj iz .env ili koristi zadanu bazu
      entities: [User], // Registracija entiteta (User)
      synchronize: true, // Automatski kreira/ ažurira tablice, koristi se samo u razvoju
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
