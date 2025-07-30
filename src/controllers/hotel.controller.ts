// src/controllers/hotel.controller.ts

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createHotelService, deleteHotelService, findHotelService ,updateHotelService , findAllHotelsService } from "../services/hotel.service";

export async function createHotelController(req: Request, res: Response , next: NextFunction) {
  try {

    const hotel = await createHotelService(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Hotel created successfully",
      data: hotel,
    });
  } catch(err){
    next(err); // Pass to error middleware
  }
}

export async function findHotelController(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const hotel = await findHotelService(id); // Service will throw NotFoundError if needed
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Hotel found successfully",
      data: hotel,
    });
  } catch (error) {
    next(error); // Pass to error middleware
  }
}

export async function updateHotelController(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const hotel = await updateHotelService(id, req.body);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (error) {
    next(error); // Pass to error middleware
  }
}

export async function deleteHotelController(req: Request, res: Response, next: NextFunction) {
  try{
    const { id } = req.params;
    await deleteHotelService(id);
    res.status(StatusCodes.NO_CONTENT).send(); // No content response
  } catch (error) {
    next(error); // Pass to error middleware
  }
}
export async function findAllHotelsController(req: Request, res: Response, next: NextFunction) {
  try {
    const hotels = await findAllHotelsService();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Hotels retrieved successfully",
      data: hotels,
    });
  } catch (error) {
    next(error); // Pass to error middleware
  }
}