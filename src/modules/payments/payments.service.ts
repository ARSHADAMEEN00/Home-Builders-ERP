import { Payment } from "./payments.interface";
import paymentModel from "./payments.model";


class paymentService {
    public paymentModel = paymentModel;

    public async createPayment(body:Payment):Promise<Payment>{
        const createPayment = await this.paymentModel.create(body);
        return createPayment;
    }

}
export default paymentService;