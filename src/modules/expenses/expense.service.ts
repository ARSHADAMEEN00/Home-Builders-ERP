import { HttpException } from '@/exceptions/HttpException';
import { Expense } from './expense.interface';
import expenseModel from './expense.model';
import { CreateExpenseDto } from './expense.dto';

class expenseService {
  public expenseModal = expenseModel;

  public async createExpense(body:any): Promise<Expense> {
    const createExpense = await this.expenseModal.create(body);
    if(!createExpense) throw new HttpException(500,'something went wrong !')
    return createExpense;
  }

  public async getAllExpense():Promise<Expense[]>{
    const getAllExpense : Expense[] = await this.expenseModal.find();
    if(getAllExpense.length == 0) throw new HttpException(404,'No expenses available at the moment !');
    return getAllExpense;
  }

  public async updateExpenseById(expenseId:string,expenseData:CreateExpenseDto):Promise<Expense>{
    const updateExpense = await this.expenseModal.findByIdAndUpdate(expenseId,expenseData,{new:true});
    if (!updateExpense) throw new HttpException(404, "expense not found. Please verify the expense ID and try again.");
    return updateExpense;
  }

  public async findexpenseById(expenseId:string):Promise<Expense>{
    const findExpenseById:Expense = await this.expenseModal.findById(expenseId);
    if (!findExpenseById) throw new HttpException(404, " Please verify the expense ID and try again.");
    return findExpenseById;
  }

  public async deleteExpenseById(expenseId:string):Promise<Expense>{
    const deleteExpenseById = await this.expenseModal.findByIdAndDelete(expenseId);
    if (!deleteExpenseById) throw new HttpException(404, "Expense not found. The expense with the given ID may have already been deleted !");
    return deleteExpenseById;
  }

}

export default expenseService;
