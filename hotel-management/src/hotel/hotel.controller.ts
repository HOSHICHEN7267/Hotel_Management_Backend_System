import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    UploadedFile,
    UseInterceptors,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { HotelService } from './hotel.service';
  import { Hotel } from './hotel.entity';
  
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
  
      // Pass file path to the service
      await this.hotelService.importHotels(file.path);
      return { message: 'Hotels imported successfully' };
    }
  
    @Get()
    async getHotels(): Promise<Hotel[]> {
      return this.hotelService.getHotels();
    }
  
    @Post()
    async addHotel(@Body() hotelDto: Partial<Hotel>) {
      if (!hotelDto.name || !hotelDto.address || !hotelDto.email) {
        throw new HttpException(
          'Missing required fields: name, address, or email',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.hotelService.addHotel(hotelDto);
    }
  
    @Put(':id')
    async updateHotel(@Param('id') id: number, @Body() hotelDto: Partial<Hotel>) {
      const hotel = await this.hotelService.updateHotel(id, hotelDto);
      if (!hotel) {
        throw new HttpException('Hotel not found', HttpStatus.NOT_FOUND);
      }
      return hotel;
    }
  }
  