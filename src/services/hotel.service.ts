import { HotelRepository } from "../repositories/hotel.repository";
import { CreateHotelInput, UpdateHotelInput } from "../validations/hotel.validation";
import { InternalServerError, NotFoundError } from "../utils/errors/app.error";

// Create an instance of the class
const hotelRepository = new HotelRepository();

export async function createHotelService(data: CreateHotelInput) {
  try {
    const hotel = await hotelRepository.createHotel(data);
    return hotel;
  } catch (error) {
    throw new InternalServerError("Failed to create hotel");
  }
}


export async function findHotelService(id: string) {
  const hotel = await hotelRepository.findHotel(id);
  if (!hotel) {
    throw new NotFoundError("Hotel not found");
  }
  return hotel;
}

export async function updateHotelService(id: string, data: UpdateHotelInput) {
  const hotel = await hotelRepository.findHotel(id);
  if (!hotel) throw new NotFoundError("Hotel not found");
  const updatedHotel = await hotelRepository.updateHotelRecord(hotel, data);
  return updatedHotel;
}

export async function hardDeleteHotelService(id: string) {
  const hotel = await hotelRepository.findHotel(id);
  if (!hotel) throw new NotFoundError("Hotel not found");
  await hotelRepository.deleteHotel(hotel);
}

export async function findAllHotelsService(){
    const hotels = await hotelRepository.findAllHotels();
    if (!hotels || hotels.length === 0) throw new NotFoundError("No hotels found");
    return hotels;
}

export async function softDeleteHotelService(id: string) {
  const hotel = await hotelRepository.findHotel(id);
  if (!hotel) throw new NotFoundError("Hotel not found");
  await hotelRepository.softDeleteHotel(hotel);
}

export async function findAllActiveHotelsService() {
  const hotels = await hotelRepository.findAllActiveHotels();
  if (!hotels || hotels.length === 0) throw new NotFoundError("No active hotels found");
  return hotels;
}

