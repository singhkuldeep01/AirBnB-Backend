import { Router } from "express";
import { cancelBookingController, confirmBookingController, createBookingController } from "../controller/booking.controller";
import { validate } from "../middleware/validateZodSchema.middleware";
import { bookingSchema } from "../validations/booking.validations";

const router = Router();

router.post('/booking' , validate(bookingSchema), createBookingController);
router.post('/booking/confirm/:idempotencyKey', confirmBookingController);
router.delete('/booking/cancel/:bookingId' , cancelBookingController);

export default router;
