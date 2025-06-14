import { Routes } from "@/interfaces/routes.interface";
import expenseController from "./expense.controller";
import { adminMiddleware } from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { CreateExpenseDto } from "./expense.dto";
import { Router, Router as ExpressRouter } from 'express'; 

class ExpenseRoute implements Routes{
public path = '/expense';
public expenseController = new expenseController();
 public router: ExpressRouter = Router();
constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`,validationMiddleware(CreateExpenseDto,'body', false),adminMiddleware,this.expenseController.createExpense);
    this.router.get(`${this.path}/all`,adminMiddleware,this.expenseController.getAllExpense);
    this.router.put(`${this.path}/:id`,validationMiddleware(CreateExpenseDto,'body', false),adminMiddleware,this.expenseController.updateExpenseById);
    this.router.get(`${this.path}/:id`,adminMiddleware,this.expenseController.findExpenseById);
    this.router.delete(`${this.path}/:id`,adminMiddleware,this.expenseController.deleteExpenseById);
  }

}

export default ExpenseRoute;