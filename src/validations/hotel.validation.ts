import { z } from "zod";

export const createHotelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1 , 'Address is required'),
  city: z.string().min(1 , 'City is required'),
  state: z.string().min(1 , 'State is required'),
  country: z.string().min(1 , 'Country is required'),
  zip_code: z.string().regex(/^\d{5,6}$/ , 'Invalid ZIP code format'),
  phone_number: z.string().regex(/^\d{10}$/ , 'Invalid phone number format'),
  email: z.string().email(),
  website: z.string().url().optional(),
  rating: z.number().min(0).max(5).optional(),
});

export const updateHotelSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  address: z.string().min(1 , 'Address is required').optional(),
  city: z.string().min(1 , 'City is required').optional(),
  state: z.string().min(1 , 'State is required').optional(),
  country: z.string().min(1 , 'Country is required').optional(),
  zip_code: z.string().regex(/^\d{5,6}$/ , 'Invalid ZIP code format').optional(),
  phone_number: z.string().regex(/^\d{10}$/ , 'Invalid phone number format').optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  rating: z.number().min(0).max(5).optional(),
});


export type UpdateHotelInput = z.infer<typeof updateHotelSchema>;
export type CreateHotelInput = z.infer<typeof createHotelSchema>;
