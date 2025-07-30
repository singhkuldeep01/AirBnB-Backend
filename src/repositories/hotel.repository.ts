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
  async deleteHotel(hotel: Hotel){
      await hotel.destroy();
  }
  async findAllHotels(){
    const hotels = await Hotel.findAll();
    return hotels;
  }
  async softDeleteHotel(hotel: Hotel) {
    hotel.deleted_at = new Date();
    await hotel.save();
  }
  async findAllActiveHotels(){
    const hotels = await Hotel.findAll({
      where: {
        deleted_at: null, // Only fetch hotels that are not soft-deleted
      },
    });
    return hotels;
  }
}
