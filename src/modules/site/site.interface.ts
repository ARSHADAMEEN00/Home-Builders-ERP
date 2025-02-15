import { Document } from 'mongoose';

export interface Site extends Document {
  name: string;
  location: string;
  clientName: string;
  clientContact: number;
  status:string;
}