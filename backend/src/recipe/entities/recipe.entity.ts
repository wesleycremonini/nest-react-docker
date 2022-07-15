import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/auth/entities/user.entity';

@Table
export class Recipe extends Model {

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Column(DataType.STRING(64))
  name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  // nome do arquivo da imagem
  @AllowNull(false)
  @Column(DataType.STRING)
  image: string;

  @AllowNull(false)
  @Column(DataType.JSON)
  ingredients: string[];

  @AllowNull(false)
  @Column(DataType.TEXT)
  instructions: string;

  @AllowNull(false)
  @Column(DataType.TINYINT)
  category: number;

  @AllowNull(false)
  @Column(DataType.JSON)
  tags: number[];
}
