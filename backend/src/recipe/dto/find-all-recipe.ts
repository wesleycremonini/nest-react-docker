import {
  IsArray,
} from 'class-validator';

export class FindAllRecipeDto {


  @IsArray()
  search: string[]; // "arroz|feijão|farinha de trigo" ["arroz", "feijão", "farinha de trigo"]
}
