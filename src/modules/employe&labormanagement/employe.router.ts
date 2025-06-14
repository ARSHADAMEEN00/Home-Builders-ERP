import { Routes } from "@/interfaces/routes.interface";
import employe_Labor_Controller from "./employe.controller";
import { adminMiddleware } from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Create_employe_laborDto } from "./employe.dto";
import { Router, Router as ExpressRouter } from 'express'; 

class Employee_LaborRoute implements Routes{
    public path = '/employe_labor';
    public employe_Labor_Controller = new employe_Labor_Controller();
   public router: ExpressRouter = Router();

    constructor() {
        this.initializeRoutes();
      }
      private initializeRoutes() {
        //create
        this.router.post(`${this.path}/create`,validationMiddleware(Create_employe_laborDto,'body', false),adminMiddleware,this.employe_Labor_Controller.create_employe_Labor);
        this.router.get(`${this.path}/all`,adminMiddleware,this.employe_Labor_Controller.getAllEmployeLabor);
        this.router.put(`${this.path}/:id`,validationMiddleware(Create_employe_laborDto,'body', false),adminMiddleware,this.employe_Labor_Controller.updateEmployeLabour);
        this.router.get(`${this.path}/:id`,adminMiddleware,this.employe_Labor_Controller.findEmployeLabourById);
        this.router.delete(`${this.path}/:id`,adminMiddleware,this.employe_Labor_Controller.deleteEmployeLabourById);
      }
}

export default Employee_LaborRoute;
