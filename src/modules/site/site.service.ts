import { HttpException } from '@/exceptions/HttpException';
import { CreateSite } from './site.dto';
import { Site } from './site.interface';
import siteModel from './site.model';
import { toNumber } from 'lodash';
import moment from 'moment';
import expenseModel from '../expenses/expense.model';
import trackingModel from '../tracking/tracking.model';
import paymentModel from '../payments/payments.model';

class siteService {
  public siteModel = siteModel;
  public expenseModal = expenseModel;
  public trackingModel = trackingModel;
  public paymentModel = paymentModel;

  public async createSite(body: CreateSite): Promise<Site> {
    const createSite: Site = await this.siteModel.create(body);
    if(!createSite) throw new HttpException(500,'something went wrong !')
    return createSite;
  }
  
  public async getAllSite(page:string,limit:string,query:any):Promise<{getSiteList:Site[],total:number,page:string}>{

    let queryData = {}
    if(query.status){
      queryData['status'] = query.status;
    }
    if(query.search){
      queryData['$or'] = [
        { name: { $regex: query?.search ? query?.search : '', $options: 'i' } },
        { clientName: { $regex: query?.search ? query?.search : '', $options: 'i' } } ,
        { location: { $regex: query?.search ? query?.search : '', $options: 'i' } } ,
        { clientContact: { $regex: query?.search ? query?.search : '', $options: 'i' } } ,
      ];
    }
    if(query.from && query.to){
      const from = moment(query.from,'YYYY/MM/DD').startOf('day')
      const to = moment(query.to,'YYYY/MM/DD').endOf('day')
      queryData['createdAt'] = {$gte:from,$lte:to};
    }

    const getSiteList :Site[] = await this.siteModel.find(queryData).sort({createdAt:-1})
    .limit(toNumber(limit))
    .skip((toNumber(page) - 1) * toNumber(limit));
    if(getSiteList.length == 0) throw new HttpException(404 ,"no data");
    const total = await this.siteModel.countDocuments(queryData);
    return {getSiteList,total,page};
  }

  public async UpdateSite(siteId:string,siteData:CreateSite):Promise<Site>{
    const updateSite:Site = await this.siteModel.findByIdAndUpdate(siteId,siteData,{ new: true });
    if (!updateSite) throw new HttpException(404, "site not found");
    return updateSite;

  }

  public async findsiteById(siteId:string):Promise<Site>{
    const findSite:Site = await this.siteModel.findById(siteId);
    if (!findSite) throw new HttpException(404, "site not found");
    return findSite;
  }

  public async deleteSite(siteId:string):Promise<Site>{
    const deleteSiteById = await this.siteModel.findByIdAndDelete(siteId);
    if (!deleteSiteById) throw new HttpException(404, "site not found");
    return deleteSiteById;
  }

  //siteDetails
  public async siteDetailsById(siteId:string):Promise<any>{
    
    const siteById = await this.siteModel.findById(siteId);
    if (!siteById) throw new HttpException(404, "site not found");
    const ExpenseById = await this.expenseModal.find({siteId});
    const trackingById = await this.trackingModel.find({siteId});
    const paymentById = await this.paymentModel.find({siteId});
    const totalExpense = ExpenseById.reduce((sum,expense)=>sum+expense.amount,0);
    const paymentGiven = paymentById.reduce((sum,payment)=>sum+payment.amount,0);
    return {site:siteById,expenses:ExpenseById,tracking:trackingById,payment:paymentById,totalExpense,paymentGiven};
  }

}

export default siteService;
