import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import expenseController from "./expense.controller";
import { adminMiddleware } from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { CreateExpenseDto } from "./expense.dto";

class ExpenseRoute implements Routes{
public path = '/expense';
public expenseController = new expenseController();
public router = Router();
constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //create
    this.router.post(`${this.path}/create`,validationMiddleware(CreateExpenseDto,'body', false),adminMiddleware,this.expenseController.createExpense);
  }

}

export default ExpenseRoute;