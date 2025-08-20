import { BookingStatusEnum, Prisma } from "@prisma/client";
import { BookingRepository } from "../repositories/booking.repository";
import { InternalServerError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import { redlock } from "../config/redis.config";
import { serverConfig } from "../config";
import prismaClient from "../prisma/client"

const bookingRepository = new BookingRepository();

export const createBookingService = async (data: Prisma.BookingCreateInput) => {
  const ttl = serverConfig.ttl; // 10 minute
  const bookingResource = `hotel:${data.hotelId}`;
  const idempotencyKey = generateIdempotencyKey();

  try {
    await redlock.acquire([bookingResource], ttl);

    // Create booking
    const booking = await bookingRepository.createBooking({
      userId: data.userId,
      hotelId: data.hotelId,
      bookingAmount: data.bookingAmount,
      totalGuests: data.totalGuests,
      expiresAt: new Date(Date.now() + ttl), // Set expiration time for the booking
    });

    // Create idempotency key
    await bookingRepository.createIdempotencyKey(idempotencyKey, booking.id);

    return {
      booking,
      idempotencyKey,
    };
  } catch (error) {
    throw new InternalServerError("Failed to create booking");
  }
};

export const confirmBookingService = async (idempotencyKey: string) => {

  return await prismaClient.$transaction(async(tx) =>{
    const idempotencyData = await bookingRepository.getIdempotentKeyWithLock(tx , idempotencyKey);
    
    if(!idempotencyData) {
        throw new Error("Idempotency key not found");
    }
    if(idempotencyData.finalized) {
      throw new Error("Booking already finalized");
    }

    const booking = await bookingRepository.getBookingById(idempotencyData.bookingId);

    if(booking?.expiresAt && booking.expiresAt.getTime() < Date.now()){
      throw new Error("Booking has expired");
    }

    const confirmedBooking = await bookingRepository.confirmBooking(idempotencyData.bookingId);

    await bookingRepository.finalizeIdempotencyKey(tx, idempotencyKey);

    return confirmedBooking;
  })
};

export const expireBookingService = async (idempotency: string) => {
  return await prismaClient.$transaction(async (tx) => {
    const idempotencyData = await bookingRepository.getIdempotentKeyWithoutLock(tx, idempotency);

    if (!idempotencyData) {
      throw new Error("Idempotency key not found");
    }
    if (idempotencyData.finalized) {
      throw new Error("Booking already finalized");
    }

    const booking = await bookingRepository.getBookingById(idempotencyData.bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.expiresAt && booking.expiresAt.getTime() < Date.now()) {
      throw new Error("Booking has already expired");
    }

    const expiredBooking = await bookingRepository.expireBooking(idempotencyData.bookingId);

    return expiredBooking;
  });
};

export const cancelBookingService = async(id : number)=>{
  const booking = await bookingRepository.getBookingById(id);
  if(!booking || booking?.bookingStatus == BookingStatusEnum.PENDING){
    throw new Error('Invalid Request');
  }else if(booking?.bookingStatus == BookingStatusEnum.CANCELED){
    throw new Error('Booking already canceled');
  }
  return await bookingRepository.cancelBooking(booking.id);
}
