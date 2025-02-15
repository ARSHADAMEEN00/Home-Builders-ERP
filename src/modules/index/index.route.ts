import { Router } from 'express';
import { Routes } from './index.interface';
import IndexController from './index.controller';

class IndexRoute implements Routes {
  public router = Router();
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
