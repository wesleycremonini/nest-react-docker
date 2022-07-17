import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Res,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'sequelize-typescript';
import { CreateUserDto, LoginDto } from './dto/index.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<User>, // private readonly jwtService: JwtService
    private readonly jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto): Promise<void | User> {
    const salt: string = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    return await this.usersRepository.create({ ...user }).catch((err) => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException(
          { error: 'Nome já está sendo usado.' },
          HttpStatus.CONFLICT,
        );
      }
    });
  }

  async login(
    req: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    
    const user: User = await this.usersRepository.findOne({
      where: { name: req.name },
    });

    if (!user) {
      throw new HttpException(
        { error: 'Usuário não encontrado.' },
        HttpStatus.NOT_FOUND,
      );
    }

    const isValid = await bcrypt.compare(req.password, user.password);

    if (!isValid) {
      throw new HttpException(
        { error: 'Senha incorreta.' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token: string = await this.jwtService.sign({ name: user.name, sub: user.id });

    res.cookie('auth-cookie', token, { httpOnly: true });

    return { message: 'Logado com sucesso!' };
  }
}
