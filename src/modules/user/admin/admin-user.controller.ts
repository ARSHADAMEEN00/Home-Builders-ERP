import { NextFunction, Request, Response } from 'express';
import { SignupUser } from '../user.dto';
import AdminUserService from './admin-user.service';
import { User } from '../user.interface';

class UserAdminController {
  public AdminUserService = new AdminUserService();
  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: SignupUser = req.body;
      console.log(user)
      const createUserData: User = await this.AdminUserService.createUser(user);
      res.status(200).json(createUserData);
    } catch (err) {
      next(err);
    }
  };

  public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const page: string = (query.page || '1') as string;
      const limit: string = (query.limit || '10') as string;

      const users = await this.AdminUserService.getAllUsers(query, limit, page);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, username, email, password } = req.body;
      const updateUser: User = await this.AdminUserService.UpdateUserById(id, { name, username, email, password });
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleteUserData = await this.AdminUserService.deleteUser(id);
      res.status(200).json(deleteUserData);
    } catch (err) {
      next(err);
    }
  };
}

export default UserAdminController;
