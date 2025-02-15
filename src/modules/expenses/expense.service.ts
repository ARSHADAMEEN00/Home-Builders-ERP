import { Expense } from './expense.interface';
import expenseModel from './expense.model';

class expenseService {
  public expenseModal = expenseModel;
  public async createExpense(body:any): Promise<Expense> {
    const createExpense = await this.expenseModal.create(body);
    return createExpense;
  }
}

export default expenseService;
