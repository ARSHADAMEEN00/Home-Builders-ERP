import { NextFunction, Request, Response } from 'express';
import dashboardService from './dashboard.service';

class dashboardController {
  public dashboardService = new dashboardService();
  public latestSiteProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const latestSitePro = await this.dashboardService.latestSiteProgress();
      res.status(200).json(latestSitePro);
    } catch (err) {
      next(err);
    }
  };
}

export default dashboardController;
