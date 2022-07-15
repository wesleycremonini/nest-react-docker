import {
  PipeTransform,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(image: any) {
    if (!image) {
      throw new HttpException('Imagem é obrigatório.', HttpStatus.BAD_REQUEST);
    }
    if (image.fieldname !== 'image') {
      throw new HttpException('xD', HttpStatus.BAD_REQUEST);
    }
    if (
      image.mimetype !== 'image/jpeg' &&
      image.mimetype !== 'image/png' &&
      image.mimetype !== 'image/jpg'
    ) {
      throw new HttpException(
        { error: 'Imagem deve ser do tipo jpeg ou png.' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (image.size > 5000000) {
      throw new HttpException(
        { error: 'Imagem deve ser menor que 5MB.' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return image;
  }
}
