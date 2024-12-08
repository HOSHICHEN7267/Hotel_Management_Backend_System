import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';

describe('HotelService', () => {
  let service: HotelService;
  let repository: Repository<Hotel>;

  const mockHotelRepository = {
    find: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelService,
        {
          provide: getRepositoryToken(Hotel),
          useValue: mockHotelRepository,
        },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
    repository = module.get<Repository<Hotel>>(getRepositoryToken(Hotel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a hotel', async () => {
    const updateData = { name: 'Updated Hotel' };
    const updatedHotel = { id: 1, ...updateData };

    mockHotelRepository.update.mockResolvedValue(undefined);
    mockHotelRepository.findOneBy.mockResolvedValue(updatedHotel); // Simulate the updated hotel

    const result = await service.updateHotel(1, updateData);
    expect(result).toEqual(updatedHotel);
    expect(mockHotelRepository.update).toHaveBeenCalledWith(1, updateData);
    expect(mockHotelRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });
});
