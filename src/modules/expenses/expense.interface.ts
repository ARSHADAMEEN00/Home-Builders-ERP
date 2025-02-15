import { Document } from 'mongoose';
import { CATEGORY } from './expense.enum';

export interface Expense extends Document{
    siteId:string;
    category:CATEGORY;
    item:string;
    amount:number;
    date:Date;
    description:string;
}