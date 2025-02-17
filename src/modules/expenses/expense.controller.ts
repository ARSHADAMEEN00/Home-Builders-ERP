import { CreateExpenseDto } from './expense.dto';
import expenseService from './expense.service';
import { NextFunction, Request, Response } from 'express';

class expenseController {
  public expenseService = new expenseService();
  public createExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createExpense = await this.expenseService.createExpense(req.body);
      res.status(201).json(createExpense);
    } catch (err) {
      next(err);
    }
  };

  public getAllExpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseList = await this.expenseService.getAllExpense();
      res.status(200).json(expenseList);
    } catch (err) {
      next(err);
    }
  };

  public updateExpenseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const expenseId:string = req.params.id;
      const expenseData:CreateExpenseDto = req.body;
      const updateExpense = await this.expenseService.updateExpenseById(expenseId,expenseData);
      res.status(200).json(updateExpense);

    } catch (err) {
      next(err);
    }
  };

  public findExpenseById = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const expenseId:string = req.params.id;
      const findExpenseById = await this.expenseService.findexpenseById(expenseId);
      res.status(200).json(findExpenseById);

    }catch(err){
      next(err)
    }
  }

  public deleteExpenseById = async(req: Request, res: Response, next: NextFunction) => {
    try{
      const expenseId:string = req.params.id;
      const deleteExpenseById = await this.expenseService.deleteExpenseById(expenseId);
      res.status(200).json(deleteExpenseById);

    }catch(err){
      next(err)
    }
  }

}

export default expenseController;
