import { Hotel } from "../db/models/hotels.model";
import {
  CreateHotelInput,
  UpdateHotelInput,
} from "../validations/hotel.validation";

export class HotelRepository {
  async createHotel(data: CreateHotelInput) {
    return Hotel.create({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  async findHotel(id: string) {
    const hotel = await Hotel.findByPk(id);
    return hotel;
  }
  async updateHotelRecord(hotel: Hotel, data: UpdateHotelInput) {
    const updatedHotel = await hotel.update({
      ...data,
      updated_at: new Date(),
    });
    return updatedHotel;
  }
}
