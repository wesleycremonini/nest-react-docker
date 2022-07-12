import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  AllowNull,
} from 'sequelize-typescript';

@Table
export class User extends Model {
  
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(20))
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;
}
