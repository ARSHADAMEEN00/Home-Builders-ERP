import trackingService from './tracking.service';
import { NextFunction, Request, Response } from 'express';

class trackingController {
  public trackingService = new trackingService();
  public createTracking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createTracking = await this.trackingService.createTracking(req.body);
      res.status(200).json(createTracking);
    } catch (err) {
      next(err);
    }
  };
}

export default trackingController;
