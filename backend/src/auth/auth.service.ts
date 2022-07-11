import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return this.usersRepository.create({ ...user });
  }
}
