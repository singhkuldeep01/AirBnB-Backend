import { HotelRepository } from "../repositories/hotel.repositorie";
import { createHotelDto } from "../dto/Hotel.dto";
import { CreateHotelInput } from "../validations/hotel.validation";
import { InternalServerError, NotFoundError } from "../utils/errors/app.error";

// Create an instance of the class
const hotelRepository = new HotelRepository();

export async function createHotel(data: CreateHotelInput) {
  try {
    const hotel = await hotelRepository.createHotel(data);
    return hotel;
  } catch (error) {
    throw new InternalServerError("Failed to create hotel");
  }
}


export async function findHotel(id: string) {
  const hotel = await hotelRepository.findHotel(id);
  if (!hotel) {
    throw new NotFoundError("Hotel not found");
  }
  return hotel;
}

export async function updateHotel(id: string, data: createHotelDto) {
  const hotel = await hotelRepository.findHotel(id);
  if (!hotel) throw new NotFoundError("Hotel not found");
  const updatedHotel = await hotelRepository.updateHotelRecord(hotel, data);
  return updatedHotel;
}
