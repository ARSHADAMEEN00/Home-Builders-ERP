import { Document } from 'mongoose';
import { PAYMENTMETHOD } from './payments.enum';

export interface Payment extends Document{
    siteId:string;
    amount:number;
    paymentMethod?:PAYMENTMETHOD;
    date?:Date;
    receivedFrom?:string;
    notes?:string;
}