import { Test, TestingModule } from '@nestjs/testing';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';

describe('HotelController', () => {
  let controller: HotelController;
  let service: HotelService;

  const mockHotelService = {
    getHotels: jest.fn(),
    addHotel: jest.fn(),
    updateHotel: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelController],
      providers: [
        {
          provide: HotelService,
          useValue: mockHotelService,
        },
      ],
    }).compile();

    controller = module.get<HotelController>(HotelController);
    service = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all hotels', async () => {
    const hotels = [{ id: 1, name: 'Test Hotel' }];
    mockHotelService.getHotels.mockResolvedValue(hotels);

    const result = await controller.getHotels();
    expect(result).toEqual(hotels);
    expect(mockHotelService.getHotels).toHaveBeenCalled();
  });

  it('should add a hotel', async () => {
    const newHotel = { name: 'New Hotel', address: 'Address', email: 'email@test.com', status: 1, coordinate: '120,25' };
    mockHotelService.addHotel.mockResolvedValue({ id: 1, ...newHotel });

    const result = await controller.addHotel(newHotel);
    expect(result).toEqual({ id: 1, ...newHotel });
    expect(mockHotelService.addHotel).toHaveBeenCalledWith(newHotel);
  });

  it('should update a hotel', async () => {
    const updateData = { name: 'Updated Hotel' };
    mockHotelService.updateHotel.mockResolvedValue({ id: 1, ...updateData });

    const result = await controller.updateHotel(1, updateData);
    expect(result).toEqual({ id: 1, ...updateData });
    expect(mockHotelService.updateHotel).toHaveBeenCalledWith(1, updateData);
  });
});
