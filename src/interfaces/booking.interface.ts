import { Document } from 'mongoose';

export interface Booking extends Document {
  booking_code: string;
  customer: string;
  booking_amount: number;
  laps_amount: number;
  rental_start_date: Date;
  rental_end_date: Date;
  status: string;
  latest_status_updated_date: Date;
  is_payment_returned: boolean;
  payment_returned_date: Date;
  remarks: string;
  is_deleted: boolean;
}
