import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import trackingController from './tracking.controller';
import { adminMiddleware } from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateTrackingDto } from './tracking.dto';

class TrackingRoute implements Routes {
  public path = '/tracking';
  public trackingController = new trackingController();
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    //create
    this.router.post(`${this.path}/create`,validationMiddleware(CreateTrackingDto,'body', false),adminMiddleware,this.trackingController.createTracking);
    this.router.get(`${this.path}/all`,adminMiddleware,this.trackingController.allTrakingList);
    this.router.put(`${this.path}/:id`,validationMiddleware(CreateTrackingDto,'body', false),adminMiddleware,this.trackingController.updateTrackingById);
    this.router.get(`${this.path}/:id`,adminMiddleware,this.trackingController.findTrackingById);
    this.router.delete(`${this.path}/:id`,adminMiddleware,this.trackingController.deleteTrackingById);
  }
}

export default TrackingRoute;
