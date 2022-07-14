import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private readonly recipeRepository: Repository<Recipe>, // private readonly jwtService: JwtService
  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    this.recipeRepository.create({ ...createRecipeDto });
    return `This action adds a new recipe ${createRecipeDto}`;
  }

  findAll() {
    return `This action returns all recipe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} ${updateRecipeDto} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
