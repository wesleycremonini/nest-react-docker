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

    return await this.recipeRepository.findAll({
      where: {
        ingredients: {
          [Op.and]: query,
        },
      },
    });
  }

  findOne(id: number) {
    return this.recipeRepository.findOne({ where: { id } });
  }
  
  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} ${updateRecipeDto} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
