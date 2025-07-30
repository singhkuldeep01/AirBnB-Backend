import { Router } from "express";
import { createHotelController, deleteHotelController, findHotelController, updateHotelController , findAllHotelsController } from "../controllers/hotel.controller";
import { createHotelSchema, updateHotelSchema } from "../validations/hotel.validation";
import { validate } from "../middleware/validateZodSchema.middleware";

const router = Router();

router.post('/hotel', validate(createHotelSchema), createHotelController);
router.get('/hotel/:id', findHotelController);
router.put('/hotel/:id', validate(updateHotelSchema), updateHotelController);
router.delete('/hotel/:id', deleteHotelController);
router.get('/hotels' , findAllHotelsController);    

export default router;