import { model, Schema, Document, Types } from 'mongoose';
import { BOOKING_STATUS } from './booking.enum';
import { Booking } from './booking.inrerface';

export const bookingSchema: Schema = new Schema({
    booking_code: {
        type: String,
        index: true,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
    },
    booking_amount: {
        type: Number,
        required: true,
    },
    laps_amount: {
        type: Number,
        default: 0
      },
    status: {
        type: String,
        enum: {
            values: Object.values(BOOKING_STATUS)
        },
        default: BOOKING_STATUS.SCHEDULED,
    },
    latest_status_updated_date: {
        type: Date,
        default: new Date
    },
    is_payment_returned: {
        type: Boolean,
    },
    payment_returned_date: {
        type: Date,
    },
    remarks: {
        type: String,
    },
    is_amount_distributed: {
        type: Boolean,
        default: false,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);
const bookingModel = model<Booking & Document>('Booking',bookingSchema);

export default bookingModel;