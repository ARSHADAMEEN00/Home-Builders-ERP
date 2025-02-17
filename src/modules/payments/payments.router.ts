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
        this.router.post(`${this.path}/create`,validationMiddleware(CreatePaymentDto,'body', false),adminMiddleware,this.paymentController.createPayment);
        this.router.get(`${this.path}/all`,adminMiddleware,this.paymentController.getAllPaymentList);
        this.router.put(`${this.path}/:id`,validationMiddleware(CreatePaymentDto,'body', false),adminMiddleware,this.paymentController.updatePaymentById);
        this.router.get(`${this.path}/:id`,adminMiddleware,this.paymentController.findPaymentById);
        this.router.delete(`${this.path}/:id`,adminMiddleware,this.paymentController.deletePaymentById);
      }
}

export default PaymentRoute;