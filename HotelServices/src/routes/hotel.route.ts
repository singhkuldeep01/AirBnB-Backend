import { Router } from "express";
import { createHotelController, deleteHotelController, findHotelController, updateHotelController , findAllHotelsController, softDeleteHotelController, findAllActiveHotelsController } from "../controllers/hotel.controller";
import { createHotelSchema, updateHotelSchema } from "../validations/hotel.validation";
import { validate } from "../middleware/validateZodSchema.middleware";

const router = Router();

router.post('/hotel', validate(createHotelSchema), createHotelController);
router.get('/hotel/:id', findHotelController);
router.put('/hotel/:id', validate(updateHotelSchema), updateHotelController);
router.delete('/hotel/:id', softDeleteHotelController);
router.get('/hotels/active', findAllActiveHotelsController);    
router.get('/hotels/all', findAllHotelsController);

export default router;