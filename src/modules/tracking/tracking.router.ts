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
  }
}

export default TrackingRoute;
