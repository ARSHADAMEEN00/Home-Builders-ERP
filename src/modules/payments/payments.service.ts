import { HttpException } from '@/exceptions/HttpException';
import { Payment } from './payments.interface';
import paymentModel from './payments.model';
import { CreatePaymentDto } from './payments.dto';

class paymentService {
  public paymentModel = paymentModel;

  public async createPayment(body: Payment): Promise<Payment> {
    const createPayment = await this.paymentModel.create(body);
    if (!createPayment) throw new HttpException(500, 'something went wrong !');
    return createPayment;
  }

  public async getAllPayment(): Promise<Payment[]> {
    const getAllPaymentList: Payment[] = await this.paymentModel.find();
    if (getAllPaymentList.length == 0) throw new HttpException(404, 'No PaymentList available at the moment !');
    return getAllPaymentList;
  }

  public async updatePaymentById(paymentId:string,paymentData:CreatePaymentDto):Promise<Payment>{
    const updatePayment = await this.paymentModel.findByIdAndUpdate(paymentId,paymentData,{new:true});
    if (!updatePayment) throw new HttpException(404, "payment not found. Please verify the payment ID and try again.");
    return updatePayment;
  }

  public async findPaymentById(paymentId:string):Promise<Payment>{
    const findPaymentById:Payment = await this.paymentModel.findById(paymentId);
    if (!findPaymentById) throw new HttpException(404, " Please verify the payment ID and try again.");
    return findPaymentById;
  }

  public async deletePaymentById(paymentId:string):Promise<Payment>{
    const deletePaymentById:Payment = await this.paymentModel.findByIdAndDelete(paymentId);
    if (!deletePaymentById) throw new HttpException(404, "payment not found. The payment with the given ID may have already been deleted !");
    return deletePaymentById;
  }



}
export default paymentService;
