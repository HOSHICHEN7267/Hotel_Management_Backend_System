import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  async importHotels(filePath: string): Promise<void> {
    const hotels = [];
    const stream = fs.createReadStream(filePath).pipe(csvParser());
    for await (const row of stream) {
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
    await this.hotelRepository.save(hotels);
  }
}
