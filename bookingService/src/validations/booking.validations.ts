import z from 'zod';

export const bookingSchema = z.object({
    userId : z.number("Enter a valid user ID"),
    hotelId : z.number("Enter a valid hotel ID"),
    bookingAmount : z.number().min(1, 'Booking amount must be greater than 0'),
    totalGuests : z.number().min(1, 'Total guests must be at least 1')
});