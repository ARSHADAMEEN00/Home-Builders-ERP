import { Routes } from '@/interfaces/routes.interface';
import { adminMiddleware } from '@/middlewares/auth.middleware';
import dashboardController from './dashboard.controller';
import { Router, Router as ExpressRouter } from 'express'; 

class DashboardRoute implements Routes {
  public path = '/dashboard';
  public dashboardController = new dashboardController();
 public router: ExpressRouter = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/latestsiteProgress`, adminMiddleware, this.dashboardController.latestSiteProgress);
   
    this.router.get(`${this.path}/counts`, adminMiddleware, this.dashboardController.totalCounts);
  }
}

export default DashboardRoute;
