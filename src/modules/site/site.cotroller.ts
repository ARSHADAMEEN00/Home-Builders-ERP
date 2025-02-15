import { NextFunction, Request, Response } from 'express';
import siteService from './site.service';

class siteController {
public siteService = new siteService();

  public createSite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createSite = await this.siteService.createSite(req.body);
      res.status(200).json(createSite);

    } catch (err) {
      next(err);
    }
  };
}

export default siteController;
