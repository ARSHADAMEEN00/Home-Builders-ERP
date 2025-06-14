
import { Routes } from './index.interface';
import IndexController from './index.controller';
import { Router, Router as ExpressRouter } from 'express'; 


class IndexRoute implements Routes {
 public router: ExpressRouter = Router();
  public path = '/';
  public IndexController = new IndexController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.IndexController.index);
  }
}

export default IndexRoute;
