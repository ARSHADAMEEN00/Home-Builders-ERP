import { Routes } from '@/interfaces/routes.interface';
import { adminMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import siteController from './site.cotroller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateSite } from './site.dto';

class SiteRoute implements Routes {
  public path = '/site';
  public siteController = new siteController();
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    //create 
    this.router.post(`${this.path}/create`,validationMiddleware(CreateSite,'body', false),adminMiddleware,this.siteController.createSite)


  }
}

export default SiteRoute;
