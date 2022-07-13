import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
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
  async login(
    @Body() req: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    return this.authService.login({ ...req }, res);
  }

  @Get('hello')
  @UseGuards(AuthGuard('jwt'))
  async hello(): Promise<string> {
    return 'Hello World!';
  }
}
