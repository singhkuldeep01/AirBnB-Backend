// src/controllers/hotel.controller.ts

import { NextFunction, Request, Response } from "express";
import { createHotelService, findHotelService ,updateHotelService } from "../services/hotel.service";

export async function createHotelController(req: Request, res: Response , next: NextFunction) {
  try {

    const hotel = await createHotelService(req.body);

    res.status(201).json({
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
    res.status(200).json({
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
    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (error) {
    next(error); // Pass to error middleware
  }
}
