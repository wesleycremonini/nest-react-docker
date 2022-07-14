import { Sequelize } from 'sequelize-typescript';
import { Recipe } from '../recipe/entities/recipe.entity';
import { User } from '../auth/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        // utilize .env
        dialect: 'mysql',
        host: 'db',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'db',
      });
      sequelize.addModels([User, Recipe]);
      await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];