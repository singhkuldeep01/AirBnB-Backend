import { Booking ,  BookingStatusEnum, IdempotencyKey, Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class BookingRepository {
    async createBooking(data: Prisma.BookingCreateInput){
        const booking = await prisma.booking.create({ data });
        return booking;
    }

    async getBookingById(id: number) {
        const booking = await prisma.booking.findUnique({ where: { id } });
        return booking;
    }

    async deleteBooking(id: number) {
        await prisma.booking.delete({ where: { id } });
    }

    async confirmBooking(id: number) {
        const booking = await prisma.booking.update({
            where: { id },
            data: { bookingStatus: BookingStatusEnum.CONFIRMED },
        });
        return booking;
    }

    async cancelBooking(id: number) {
        const booking = await prisma.booking.update({
            where: { id },
            data: { bookingStatus: BookingStatusEnum.CANCELED },
        });
        return booking;
    }

    async getIdempotentKeyWithLock(tx: Prisma.TransactionClient , key : string){
        const idempotencyKey: Array<IdempotencyKey> = await tx.$queryRaw(
            Prisma.raw(`SELECT * FROM idempotencykey WHERE idemKey = '${key}' FOR UPDATE;`)
        )
        return idempotencyKey[0];
    }
    async getIdempotentKeyWithoutLock(tx: Prisma.TransactionClient , key : string){
        const idempotencyKey: Array<IdempotencyKey> = await tx.$queryRaw(
            Prisma.raw(`SELECT * FROM idempotencykey WHERE idemKey = '${key}' UPDATE;`)
        )
        return idempotencyKey[0];
    }

    async createIdempotencyKey(key : string ,bookingId: number) {
        const idempotencyKey = await prisma.idempotencyKey.create({
            data: {
                idemKey: key,
                booking: {
                    connect: { id: bookingId },
                },
            },
        });
        return idempotencyKey;
    }

    async expireBooking(id: number) {
        const booking = await prisma.booking.update({
            where: { id },
            data: { expiresAt: new Date(Date.now()) },
        });
        return booking;
    }

    async finalizeIdempotencyKey(tx: Prisma.TransactionClient, key: string) {
        await tx.idempotencyKey.update({
            where: { idemKey: key },
            data: { finalized: true },
        });
    }

    

    async getAllBookings() {
        const bookings = await prisma.booking.findMany();
        return bookings;
    }
}