import { NextFunction, Request, Response } from 'express';
import UserUserService from './user-user.service';
import { User } from '../user.interface';
class userController {
  public useService = new UserUserService();
  public getdata = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const findOneUserData: User = await this.useService.findUserById(id);
      res.status(200).json(findOneUserData);
    } catch (err) {
      next(err);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const { name, username, email, password } = req.body;
      const updateUser: User = await this.useService.UpdateUserById(id, { name, username, email, password });
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  };
}

export default userController;
