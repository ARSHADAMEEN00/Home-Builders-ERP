import employe_Labor_Service from './employe.service';
import { NextFunction, Request, Response } from 'express';

class employe_Labor_Controller {
  public employe_Labor_Service = new employe_Labor_Service();

  public create_employe_Labor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const create_employe_Labor = await this.employe_Labor_Service.createEmploye_Labor_Management(req.body);
      res.status(200).json(create_employe_Labor);
    } catch (err) {
      next(err);
    }
  };
}

export default employe_Labor_Controller;
