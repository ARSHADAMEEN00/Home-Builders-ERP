import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import paymentController from "./payments.controller";
import { adminMiddleware } from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { CreatePaymentDto } from "./payments.dto";

class PaymentRoute implements Routes{
    public path = '/payment';
    public paymentController = new paymentController();
    public router = Router();
    constructor() {
        this.initializeRoutes();
      }
      private initializeRoutes() {
        // create
        this.router.post(`${this.path}/create`,validationMiddleware(CreatePaymentDto,'body', false),adminMiddleware,this.paymentController.createPayment);

      }
}

export default PaymentRoute;