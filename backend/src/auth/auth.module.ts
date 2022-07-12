import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { usersProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret, // usar no .env em aplicação real
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  providers: [AuthService, ...usersProviders, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
