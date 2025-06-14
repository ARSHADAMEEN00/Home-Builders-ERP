
import { Routes } from '../index/index.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { DeleteImageDto, UploadImageDto } from './image.dto';
import ImageController from './image.controller';
import { Router, Router as ExpressRouter } from 'express'; 

class ImageRoute implements Routes {
  public path = '/image';
 public router: ExpressRouter = Router();
  public ImageController = new ImageController();
  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(`${this.path}/admin/upload`, validationMiddleware(UploadImageDto, 'body', false), this.ImageController.uploadImage);
    this.router.post(`${this.path}/admin/delete`, validationMiddleware(DeleteImageDto, 'body', false), this.ImageController.deleteImage);
    this.router.get(`/uploads/:fileType/:fileName`, this.ImageController.viewUploadedFileSharp);
    this.router.get(`/uploads/:fileType/:transformations/:fileName`, this.ImageController.viewUploadedFileSharp);
  }
}

export default ImageRoute;
