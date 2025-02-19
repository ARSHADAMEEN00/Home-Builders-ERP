import { model, Schema, Document, Types } from 'mongoose';
import { ROLE, WORKSTATUS } from './employe.enum';


const Employee_Labor_Management_Schema: Schema = new Schema(
  {
    name: {
        type: String,
    },
    role: {
        type: String,
        enum: {
          values: Object.values(ROLE),
          message: 'Please Select correct role !',
        },
    },
    contact: {
      type: String,
      
    },
    assignedSite: {
        type: Types.ObjectId,
        required: true,
        ref: 'Site',
    },

    workStatus: {
        type: String,
        enum: {
          values: Object.values(WORKSTATUS),
          message: 'Please Select correct workstatus !',
        },
    },
  },
  { timestamps: true },
);

const Employee_Labor_Management_Model = model<any & Document>('Employee & Labor_Management', Employee_Labor_Management_Schema);
export default Employee_Labor_Management_Model;
