// src/controllers/hotel.controller.ts

import { NextFunction, Request, Response } from "express";
import { createHotel, findHotel, updateHotel } from "../services/hotel.service";
import { createHotelSchema } from "../validations/hotel.validation";
import { NotFoundError } from "../utils/errors/app.error";
import { ca } from "zod/v4/locales/index.cjs";

export async function createHotelController(req: Request, res: Response , next: NextFunction) {
  try {
    
    const hotel = await createHotel(req.body);

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
    const hotel = await findHotel(id); // Service will throw NotFoundError if needed
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
    const hotel = await updateHotel(id, req.body);
    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (error) {
    next(error); // Pass to error middleware
  }
}
