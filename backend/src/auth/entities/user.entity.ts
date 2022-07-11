import { Table, Column, Model, Max, Min, NotNull } from 'sequelize-typescript';

@Table
export class User extends Model {
  
  @Max(20)
  @Min(4)
  @NotNull
  @Column
  name: string;

  @Max(20)
  @Min(4)
  @NotNull
  @Column
  password: string;
}
