import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { LoginUser, SignupUser } from '../user/user.dto';
import { User } from '../user/user.interface';

class AuthController {
  public authService = new AuthService();
  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: SignupUser = req.body;
      const create: User = await this.authService.userSingup(userData);
      res.status(201).json(create);
    } catch (err) {
      next(err);
    }
  };
  
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('login');
      const loginData: LoginUser = req.body;
      const userLogin = await this.authService.userLogin(loginData);
      res.status(200).json(userLogin);
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
