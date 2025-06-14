import { Routes } from '@interfaces/routes.interface';
import AuthController from './auth.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { LoginUser, SignupUser } from '../user/user.dto';
import { Router, Router as ExpressRouter } from 'express';

class AuthRoute implements Routes {
    public path = '/auth';
    public router: ExpressRouter = Router(); // <-- Explicitly typed
    public authController = new AuthController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes(){
        // this.router.post(`${this.path}/signup`,validationMiddleware(SignupUser,'body',false),this.authController.signup)
        this.router.post(`${this.path}/login`,validationMiddleware(LoginUser,'body',false),this.authController.login)
    }
}

export default AuthRoute;