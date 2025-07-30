export type createHotelDto = {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    phone_number: string;
    email: string;
    rating: number;
    website?: string;
};
export type updateHotelDto = {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  phone_number?: string;
  email?: string;
  rating?: number;
  website?: string;
};