import { CreatePaymentDto } from './payments.dto';
import paymentService from './payments.service';
import { NextFunction, Request, Response } from 'express';

class paymentController {
  public paymentService = new paymentService();
  public createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createPayment = await this.paymentService.createPayment(req.body);
      res.status(201).json(createPayment);
    } catch (err) {
      next(err);
    }
  };

  public getAllPaymentList = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const paymentList = await this.paymentService.getAllPayment();
      res.status(200).json(paymentList);
    }catch(err){
      next(err)
    }
  }

  public updatePaymentById= async(req: Request, res: Response, next: NextFunction) => {
    try{
      const paymentId:string = req.params.id;
      const paymentData :CreatePaymentDto = req.body;
      const updatePayment = await this.paymentService.updatePaymentById(paymentId,paymentData);
      res.status(200).json(updatePayment);

    }catch(err){
      next(err)
    }
  }

  public findPaymentById = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const paymentId:string = req.params.id;
      const findPaymentById = await this.paymentService.findPaymentById(paymentId);
      res.status(200).json(findPaymentById);

    }catch(err){
      next(err)
    }
  }

  
  public deletePaymentById = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const paymentId:string = req.params.id;
      const deletePaymentById = await this.paymentService.deletePaymentById(paymentId);
      res.status(200).json(deletePaymentById);

    }catch(err){
      next(err)
    }
  }
}

export default paymentController;
