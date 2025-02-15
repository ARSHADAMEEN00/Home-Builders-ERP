import { model, Schema, Document, Types } from 'mongoose';
import { STATUS } from './tracking.enum';

const trackingSchema: Schema = new Schema(
  {
    siteId: {
      type: Types.ObjectId,
      required: true,
      ref: 'Site',
    },
    progressPercentage: {
      type: Number,
    },
    milestones:[
        {
            name:{
                type:String,
                required: true,
            },
            status:{
                type: String,
                enum: {
                        values: Object.values(STATUS),
                        message: 'Please Select correct status !',
                      },
            },
            completionDate:{
                type:Date,
                default: Date.now,
            }
        }
    ]
   
  },
  { timestamps: true },
);

const trackingModel = model<any & Document>('Tracking', trackingSchema);
export default trackingModel;
