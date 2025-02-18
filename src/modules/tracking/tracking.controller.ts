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

  public allTrakingList = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const trackingList = await this.trackingService.getAllTracking();
      res.status(200).json(trackingList);

    }catch(err){
      next(err)
    }
  }

  public updateTrackingById = async(req: Request, res: Response, next: NextFunction) => {
    try{

      const trackingId:string = req.params.id;
      const trackingData = req.body;
      const updateTrackingData = await this.trackingService.updateTrackingById(trackingId,trackingData);
      res.status(200).json(updateTrackingData);
    }catch(err){
      next(err)
    }
  }

  public findTrackingById = async(req: Request, res: Response, next: NextFunction) => {
    try{
      const trackingId:string = req.params.id;
      const findTrackingById = await this.trackingService.findTrackingById(trackingId);
      res.status(200).json(findTrackingById);
    }catch(err){
      next(err)
    }
  }

  public deleteTrackingById = async(req: Request, res: Response, next: NextFunction) => {
    try{
      const trackingId:string = req.params.id;
      const deleteTrackingById = await this.trackingService.deleteTrackingById(trackingId);
      res.status(200).json(deleteTrackingById);
    }catch(err){
      next(err)
    }
  }

}

export default trackingController;
