import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Table
export class User extends Model {
  @HasMany(() => Recipe)
  players: Recipe[];

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(20))
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;
}
