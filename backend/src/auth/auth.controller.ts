import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/index.dto';
import { User } from './entities/user.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() req: CreateUserDto): Promise<void | User> {
    return this.authService.register({ ...req });
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() req: LoginDto): Promise<{ token: string }> {
    return this.authService.login({ ...req });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('hello')
  async hello(): Promise<string> {
    return 'Hello World!';
  }
}
