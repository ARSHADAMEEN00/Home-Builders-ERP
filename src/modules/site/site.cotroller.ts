import { NextFunction, Request, Response } from 'express';
import siteService from './site.service';
import { CreateSite } from './site.dto';

class siteController {
  public siteService = new siteService();

  public createSite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createSite = await this.siteService.createSite(req.body);
      res.status(201).json(createSite);
    } catch (err) {
      next(err);
    }
  };

  public getSiteList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const siteList = await this.siteService.getAllSite();
      res.status(200).json(siteList);
    } catch (err) {
      next(err);
    }
  };

  public updateSite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const siteId: string = req.params.id;
      const siteData: CreateSite = req.body;
      const updateSite = await this.siteService.UpdateSite(siteId, siteData);
      res.status(200).json(updateSite);
    } catch (err) {
      next(err);
    }
  };

  public findSiteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const siteId: string = req.params.id;
      const findSiteById = await this.siteService.findsiteById(siteId);
      res.status(200).json(findSiteById);
    } catch (err) {
      next(err);
    }
  };

  public deleteSiteById = async(req: Request, res: Response, next: NextFunction) => {
    try{
      const siteId: string = req.params.id;
      const deleteSiteById = await this.siteService.deleteSite(siteId);
      res.status(200).json(deleteSiteById);
      
    }catch(err){
      next(err)
    }
  }

}

export default siteController;
