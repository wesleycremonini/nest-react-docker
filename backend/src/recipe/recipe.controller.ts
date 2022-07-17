import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from './dto/imageValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { FindAllRecipeDto } from './dto/find-all-recipe';
import { Recipe } from './entities/recipe.entity';
// import { FindAllRecipeDto } from './dto/find-all-recipe';
// import { Recipe } from './entities/recipe.entity';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './uploads/recipes',
    }),
  )
  async create(
    @Req() req,
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile(new ImageValidationPipe()) image: any,
  ) {
    return await this.recipeService.create(
      createRecipeDto,
      image,
      req.user.sub,
    );
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Body() body: FindAllRecipeDto): Promise<Recipe[]> {
    return await this.recipeService.findAll(body);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  async findAllUser(@Req() req): Promise<Recipe[]> {
    return await this.recipeService.findAllUser(req.user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: string): Promise<Recipe> {
    return await this.recipeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Req() req,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    return await this.recipeService.update(+id, updateRecipeDto, req.user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Req() req): Promise<{ message: string }> {
    return await this.recipeService.remove(+id, req.user.sub);
  }
}
