import expenseService from './expense.service';
import { NextFunction, Request, Response } from 'express';

class expenseController {
  public expenseService = new expenseService();
  public createExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createExpense = await this.expenseService.createExpense(req.body);
      res.status(200).json(createExpense);
    } catch (err) {
      next(err);
    }
  };
}

export default expenseController;
