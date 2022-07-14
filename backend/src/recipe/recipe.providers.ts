import { Recipe } from './entities/recipe.entity';

export const recipeProviders = [
  {
    provide: 'RECIPE_REPOSITORY',
    useValue: Recipe,
  },
];
