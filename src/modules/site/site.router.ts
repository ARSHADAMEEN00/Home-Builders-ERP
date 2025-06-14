import { Routes } from '@/interfaces/routes.interface';
import { adminMiddleware } from '@/middlewares/auth.middleware';
import siteController from './site.cotroller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateSite } from './site.dto';
import { Router, Router as ExpressRouter } from 'express'; 


class SiteRoute implements Routes {
  public path = '/site';
  public siteController = new siteController();
 public router: ExpressRouter = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    //create
    this.router.post(`${this.path}/create`, validationMiddleware(CreateSite, 'body', false), adminMiddleware, this.siteController.createSite);
    //getAllSite
    this.router.get(`${this.path}/all`, adminMiddleware, this.siteController.getSiteList);
    // update
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateSite, 'body', false), adminMiddleware, this.siteController.updateSite);
    //getById
    this.router.get(`${this.path}/:id`,adminMiddleware,this.siteController.findSiteById);
    //delete
    this.router.delete(`${this.path}/:id`,adminMiddleware,this.siteController.deleteSiteById);

    // site details 
    this.router.post(`${this.path}/details/:id`,adminMiddleware,this.siteController.siteDetailsById);

  }
}

export default SiteRoute;
