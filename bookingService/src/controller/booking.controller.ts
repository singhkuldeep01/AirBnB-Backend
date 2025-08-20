import { NextFunction , Request , Response } from "express";
import { createBookingService , confirmBookingService, cancelBookingService, expireBookingService } from "../services/booking.service";
import { StatusCodes } from "http-status-codes";
import { serverConfig } from "../config";

export const createBookingController = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const booking = await createBookingService(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Booking created successfully",
      bookingId: booking.booking.id,
      idempotencyKey: booking.idempotencyKey,
      sessionTime: `${serverConfig.ttl/60000}mins`
    });
  } catch (error) {
    next(error);
  }
};

export const confirmBookingController = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const booking = await confirmBookingService(req.params.idempotencyKey as string);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Booking confirmed successfully",
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBookingController = async (req: Request, res:Response, next:NextFunction)=>{
  try{
    const bookingId = req.params.bookingId;
    const result = await cancelBookingService(Number(bookingId));
    res.status(StatusCodes.OK).json(result);
  }catch(err){
    next(err);
  }
}

export const expireBookingController = (req: Request, res:Response, next:NextFunction)=>{
  try{
    const key = req.params.idempotencyKey;
    const result = expireBookingService(key);
    res.status(StatusCodes.OK).json({
      message:"success"
    });
  }catch(err){
    next(err);
  }
}
