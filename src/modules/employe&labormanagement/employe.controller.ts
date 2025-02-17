import { Create_employe_laborDto } from './employe.dto';
import employe_Labor_Service from './employe.service';
import { NextFunction, Request, Response } from 'express';

class employe_Labor_Controller {
  public employe_Labor_Service = new employe_Labor_Service();

  public create_employe_Labor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const create_employe_Labor = await this.employe_Labor_Service.createEmploye_Labor_Management(req.body);
      res.status(201).json(create_employe_Labor);
    } catch (err) {
      next(err);
    }
  };

  public getAllEmployeLabor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllEmployeLabor = await this.employe_Labor_Service.getAllEmployeLabor();
      res.status(200).json(getAllEmployeLabor);
    } catch (err) {
      next(err);
    }
  };

  public updateEmployeLabour = async (req: Request, res: Response, next: NextFunction) => {
    try{
     
      const employeLaborId:string = req.params.id;
      const employeLaborData:Create_employe_laborDto  = req.body;
      const updateEmployeLabor = await this.employe_Labor_Service.updateEmployeLaborById(employeLaborId,employeLaborData);
      res.status(200).json(updateEmployeLabor);

    }catch(err){
      next(err)
    }
  }

  public findEmployeLabourById = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const employeLaborId:string = req.params.id;
      const findEmployeLabourById = await this.employe_Labor_Service.findEmployeLaborById(employeLaborId);
      res.status(200).json(findEmployeLabourById);

    }catch(err){
      next(err)
    }
  }

  public deleteEmployeLabourById = async(req: Request, res: Response, next: NextFunction) => {
    try{
      const employeLaborId:string = req.params.id;
      const deleteEmployeLaborById =  await this.employe_Labor_Service.deleteEmployeLaborById(employeLaborId);
      res.status(200).json(deleteEmployeLaborById);

    }catch(err){
      next(err)
    }
  }


}

export default employe_Labor_Controller;
