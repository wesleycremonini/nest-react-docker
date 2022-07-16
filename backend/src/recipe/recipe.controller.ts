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
    return await this.recipeService.create(createRecipeDto, image, req.user.sub);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Body() body: FindAllRecipeDto): Promise<Recipe[]> {
    return await this.recipeService.findAll(body);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
