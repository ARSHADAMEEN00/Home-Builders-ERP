import paymentService from './payments.service';
import { NextFunction, Request, Response } from 'express';

class paymentController {
  public paymentService = new paymentService();
  public createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createPayment = await this.paymentService.createPayment(req.body);
      res.status(200).json(createPayment);
    } catch (err) {
      next(err);
    }
  };
}

export default paymentController;
