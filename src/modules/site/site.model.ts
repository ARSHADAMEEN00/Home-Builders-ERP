import { model, Schema, Document, Types } from 'mongoose';
import { STATUS } from './site.enum';
import { Site } from './site.interface';


const siteSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
    },
    clientContact: {
      type: Number,
    },
    status: {
      type: String,
      enum:{
        values:Object.values(STATUS),
        message:'Please Select correct status'
      }
    },
  },
  { timestamps: true },
);



const siteModel = model<Site & Document>('Site', siteSchema);
export default siteModel;
