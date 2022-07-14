import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [AuthModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
