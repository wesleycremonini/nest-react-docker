import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { recipeProviders } from './recipe.providers';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, ...recipeProviders]
})
export class RecipeModule {}
