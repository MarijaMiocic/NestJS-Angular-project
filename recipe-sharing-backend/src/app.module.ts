import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity'; // Import User entiteta
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Koristi SQLite kao bazu podataka
      database: 'recipe-sharing.db', // Naziv SQLite datoteke
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
