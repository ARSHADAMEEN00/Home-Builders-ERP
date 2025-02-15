import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import AdminUserService from '@/modules/user/admin/admin-user.service';
export const userAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization: string = req?.cookies['Authorization'] || req.header('Authorization')?.split('Bearer ')[1] || null ;
    if (Authorization) {
      const user = await new AdminUserService().getUserByToken(Authorization);
      if (!user) throw new HttpException(204, 'No user in this Token');
      req.body.authUser = user;
      next();
    } else {
      next(new HttpException(401, 'Authentication token missing'));
    }
  } catch (error) {
    next(error);
  }
};



export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization: string = req?.cookies['Authorization'] || req?.header('Authorization')?.split('Bearer ')[1] || null;
    if (Authorization) {
      // const user = await new AuthService().verifyIdToken(Authorization)
      const user = await new AdminUserService().getUserByToken(Authorization);
      if (!user) next(new HttpException(404, 'No user in this Token #admin'));
      req.body.authUser = user;
      const isAdmin = await new AdminUserService().isAdmin(user._id);
      if (!isAdmin) throw new HttpException(400, 'Not an admin. Access denied!');

      next();
    } else {
      next(new HttpException(401, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(400, 'Not an admin'));
  }
};
