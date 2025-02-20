import Employee_Labor_Management_Model from '../employe&labormanagement/employe.model';
import expenseModel from '../expenses/expense.model';
import siteModel from '../site/site.model';
import trackingModel from '../tracking/tracking.model';

class dashboardService {
  public trackingModel = trackingModel;
  public expenseModal = expenseModel;
  public siteModel = siteModel;
  public Employee_Labor_Management_Model = Employee_Labor_Management_Model;

  public async latestSiteProgress(): Promise<any> {
    const latestSitePro = await this.trackingModel
      .findOne()
      .sort({ createdAt: -1 })
      .populate({
        path: 'siteId',
        // select: { createdAt:1},
      })
      .exec();
    const totalExpense = await this.expenseModal.find({ siteId: latestSitePro?.siteId?._id });
    // Calculate total amount from all expenses
    const totalExpenseAmount = totalExpense.reduce((sum, expense) => sum + expense.amount, 0);
    return { latestSitePro, totalExpenseAmount };
  }

  public async totalCounts():Promise<any>{
    const totalsite = await this.siteModel.countDocuments();
    const totalEmploye = await this.Employee_Labor_Management_Model.countDocuments();
    const activeSite = await this.siteModel.countDocuments({status:'active'});
    const completeSite = await this.siteModel.countDocuments({status:'completed'});
    const pendingSite = await this.siteModel.countDocuments({status:'pending'});
    const activeEmploye =await this.Employee_Labor_Management_Model.countDocuments({workStatus:'active'});
    const inactiveEmploye =await this.Employee_Labor_Management_Model.countDocuments({workStatus:'inactive'});
    return {
      site:{
        totalsite,
        activeSite,
        completeSite,
        pendingSite
      },
      employee:{
        totalEmploye,
        activeEmploye,
        inactiveEmploye
      }
      
    };
    
  }

}

export default dashboardService;
