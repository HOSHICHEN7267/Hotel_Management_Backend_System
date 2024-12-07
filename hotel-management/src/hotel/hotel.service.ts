import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';
import * as csvParser from 'csv-parser';
import * as fs from 'fs/promises';
import * as path from 'path';
import { createReadStream } from 'fs';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async importHotels(filePath: string): Promise<void> {
    const hotels = [];
    const resolvedPath = path.resolve(filePath);

    try {
      const stream = createReadStream(resolvedPath).pipe(csvParser());

      for await (const row of stream) {
        console.log('Row: ', row);
        const hotel = {
          name: row.name,
          webLink: row.webLink || null,
          address: `${row.address},${row.city},${row.country}`,
          email: row.email,
          status: row.is_open === 'true' ? 1 : 0,
          coordinate: `${row.longitude},${row.latitude}`,
        };
        hotels.push(hotel);
      }

      // Save hotels to the database
      await this.hotelRepository.save(hotels);
    } catch (error) {
      console.error('Error while processing the CSV file:', error);
      throw error;
    } finally {
      // Cleanup the temporary file
      try {
        await fs.unlink(resolvedPath);
        console.log(`Temporary file deleted: ${resolvedPath}`);
      } catch (cleanupError) {
        console.error(`Failed to delete temporary file: ${resolvedPath}`, cleanupError);
      }
    }
  }

  async getHotels(): Promise<Hotel[]> {
    return this.hotelRepository.find();
  }

  async addHotel(hotelDto: Partial<Hotel>): Promise<Hotel> {
    const hotel = this.hotelRepository.create(hotelDto);
    return this.hotelRepository.save(hotel);
  }

  async updateHotel(id: number, hotelDto: Partial<Hotel>): Promise<Hotel> {
    await this.hotelRepository.update(id, hotelDto);
    return this.hotelRepository.findOneBy({ id });
  }
}
