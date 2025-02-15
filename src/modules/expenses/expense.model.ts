//Expenses
import { model, Schema, Document, Types } from 'mongoose';
import { CATEGORY } from './expense.enum';
import { Expense } from './expense.interface';

const ExpensesSchema: Schema = new Schema(
  {
    siteId: {
      type: Types.ObjectId,
      required: true,
      ref: 'Site',
    },

    category: {
      type: String,
      required: true,
      enum: {
        values: Object.values(CATEGORY),
        message: 'Please Select correct category !',
      },
    },

    item: {
      type: String,
    },
    amount: {
      type: Number,
    },
    date:{
        type:Date,
        default:Date.now
    },
    description:{
        type:String
    }

  },
  { timestamps: true },
);

const expenseModel = model<Expense & Document>('Expense', ExpensesSchema);
export default expenseModel;
