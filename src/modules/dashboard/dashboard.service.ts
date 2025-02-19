import expenseModel from '../expenses/expense.model';
import trackingModel from '../tracking/tracking.model';

class dashboardService {
  public trackingModel = trackingModel;
  public expenseModal = expenseModel;
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
}

export default dashboardService;
