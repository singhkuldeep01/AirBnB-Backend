import { Router } from "express";
import { createHotelController, findHotelController, updateHotelController } from "../controllers/hotel.controller";
import { createHotelSchema, updateHotelSchema } from "../validations/hotel.validation";
import { validate } from "../middleware/validateZodSchema.middleware";

const router = Router();

router.post('/hotel', validate(createHotelSchema), createHotelController);
router.get('/hotel/:id', findHotelController);
router.put('/hotel/:id', validate(updateHotelSchema), updateHotelController);

export default router;