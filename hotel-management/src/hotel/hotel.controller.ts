import { Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // File directory
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${file.originalname}-${uniqueSuffix}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File not uploaded', HttpStatus.BAD_REQUEST);
    }

    console.log('File:', file);

    // Pass file path to the service
    await this.hotelService.importHotels(file.path);
    return { message: 'Hotels imported successfully' };
  }
}
