import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import userController from './user/user-user.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { SignupUser, UpdateUser, userId } from './user.dto';
import UserAdminController from './admin/admin-user.controller';
import { adminMiddleware, userAuthMiddleware } from '@/middlewares/auth.middleware';

class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new userController();
  public userAdminController = new UserAdminController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    // users
    this.router.get(`${this.path}/profile/:id`, userAuthMiddleware, this.userController.getdata);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateUser, 'body', false), userAuthMiddleware, this.userController.updateUser);
    // admin
    this.router.post(`${this.path}/admin/new`, validationMiddleware(SignupUser, 'body', false), this.userAdminController.createUser);
    this.router.get(`${this.path}/admin/all`, adminMiddleware, this.userAdminController.getAllUsers);
    this.router.put(`${this.path}/admin/:id`, validationMiddleware(UpdateUser, 'body', false), adminMiddleware, this.userAdminController.updateUser);
    this.router.delete(`${this.path}/admin/:id`, adminMiddleware, this.userAdminController.deleteUser);
  }
}

export default UserRoute;
