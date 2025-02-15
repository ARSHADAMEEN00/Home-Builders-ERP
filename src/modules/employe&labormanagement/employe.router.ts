import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import employe_Labor_Controller from "./employe.controller";
import { adminMiddleware } from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Create_employe_laborDto } from "./employe.dto";

class Employee_LaborRoute implements Routes{
    public path = '/employe_labor';
    public employe_Labor_Controller = new employe_Labor_Controller();
    public router = Router();

    constructor() {
        this.initializeRoutes();
      }
      private initializeRoutes() {
        //create
        this.router.post(`${this.path}/create`,validationMiddleware(Create_employe_laborDto,'body', false),adminMiddleware,this.employe_Labor_Controller.create_employe_Labor);
      }
}

export default Employee_LaborRoute;
