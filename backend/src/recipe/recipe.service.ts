import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { join } from 'path';
import { Op } from 'sequelize';
import { Repository } from 'sequelize-typescript';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FindAllRecipeDto } from './dto/find-all-recipe';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
var fs = require('fs');
@Injectable()
export class RecipeService {
  constructor(
    @Inject('RECIPE_REPOSITORY')
    private readonly recipeRepository: Repository<Recipe>, // private readonly jwtService: JwtService
  ) {}

  async create(
    createRecipeDto: CreateRecipeDto,
    image: any,
    userId: number,
  ): Promise<Recipe> {
    try {
      const date = Date.now();
      const newName = userId + '-' + new Date(date).toISOString() + '.png';
      fs.rename(
        join(__dirname, '..', '..', 'uploads', 'recipes') +
          '/' +
          image.filename,
        'uploads/recipes/' + newName,
        (err) => {
          if (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        },
      );
      image.filename = newName;
      const recipe = await this.recipeRepository.create({
        ...createRecipeDto,
        user_id: userId,
        image: image.filename,
      });
      return recipe;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Algo deu errado',
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(body: FindAllRecipeDto): Promise<Recipe[]> {
    const search = body.search;

    const query: object[] = [];

    for (const key in search) {
      if (search[key] !== '') {
        query[key] = {
          [Op.like]: `%${search[key]}%`,
        };
      }
    }

    const recipes = await this.recipeRepository.findAll({
      where: {
        ingredients: {
          [Op.and]: query,
        },
      },
    });

    if (recipes.length <= 0) {
      throw new HttpException(
        { message: 'Nenhuma receita encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }

    return recipes;
  }

  async findAllUser(id: number): Promise<Recipe[]> {
    const recipes = await this.recipeRepository.findAll({
      where: { user_id: id },
    });
    if (recipes.length <= 0) {
      throw new HttpException(
        { message: 'Nenhuma receita encontrada' },
        HttpStatus.NOT_FOUND,
      );
    }
    return recipes;
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a receita' },
        HttpStatus.NOT_FOUND,
      );
    }
    return recipe;
  }

  async update(
    id: number,
    updateRecipeDto: UpdateRecipeDto,
    userId: number,
  ): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: id, user_id: userId },
    });
    if (!recipe) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a receita' },
        HttpStatus.NOT_FOUND,
      );
    }
    return await recipe.update(updateRecipeDto);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: id, user_id: userId },
    });
    if (!recipe) {
      throw new HttpException(
        { message: 'Não foi possível encontrar a receita' },
        HttpStatus.NOT_FOUND,
      );
    }
    await recipe.destroy();
    return { message: 'Receita removida com sucesso' };
  }
}
