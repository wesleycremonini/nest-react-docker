import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'sequelize-typescript';
import { CreateUserDto, LoginDto } from './dto/index.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<User>, // private readonly jwtService: JwtService
    private readonly jwtService: JwtService,
  ) {}

  async register(user: CreateUserDto): Promise<void | User> {
    const salt = await bcrypt.genSalt();
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

    async login(req: LoginDto): Promise<{ token: string }> {
      const user = await this.usersRepository.findOne({
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

      const token = await this.jwtService.sign({ name: user.name, sub: user.id });
      return { token };
      
    }
}
