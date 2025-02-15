import { model, Schema, Document, Types } from 'mongoose';
import { PAYMENTMETHOD } from './payments.enum';
import { Payment } from './payments.interface';

const paymentSchema: Schema = new Schema(
  {
    siteId: {
      type: Types.ObjectId,
      required: true,
      ref: 'Site',
    },
    amount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      enum: {
        values: Object.values(PAYMENTMETHOD),
        message: 'Please Select correct paymentMethod !',
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
    receivedFrom: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true },
);

const paymentModel = model<Payment & Document>('Payments', paymentSchema);
export default paymentModel;
