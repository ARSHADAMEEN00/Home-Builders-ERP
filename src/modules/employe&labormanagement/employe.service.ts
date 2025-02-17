import { HttpException } from '@/exceptions/HttpException';
import { EmployeLabour } from './employe.interface';
import Employee_Labor_Management_Model from './employe.model';
import { Create_employe_laborDto } from './employe.dto';

class employe_Labor_Service {
  public Employee_Labor_Management_Model = Employee_Labor_Management_Model;

  public async createEmploye_Labor_Management(body: any): Promise<EmployeLabour> {
    const createEmploye_Labor_Management = await this.Employee_Labor_Management_Model.create(body);
    if (!createEmploye_Labor_Management) throw new HttpException(500, 'something went wrong !');
    return createEmploye_Labor_Management;
  }

  public async getAllEmployeLabor():Promise<EmployeLabour[]>{
    const getAllEmployeLaborList : EmployeLabour[] = await this.Employee_Labor_Management_Model.find();
    if (getAllEmployeLaborList.length == 0) throw new HttpException(404, 'No employee labor records found. Please add data to view the list !');
    return getAllEmployeLaborList;
  }

  public async updateEmployeLaborById(employeLaborId:string,employeLaborData:Create_employe_laborDto):Promise<EmployeLabour>{
    const updateEmployeLabor = await this.Employee_Labor_Management_Model.findByIdAndUpdate(employeLaborId,employeLaborData,{new:true});
    if (!updateEmployeLabor) throw new HttpException(404, "EmployeLabour not found. Please verify the EmployeLabour ID and try again.");
    return updateEmployeLabor;
  }

  public async findEmployeLaborById(employeLaborId:string):Promise<EmployeLabour>{
    const findEmployeLaborById :EmployeLabour = await this.Employee_Labor_Management_Model.findById(employeLaborId);
    if (!findEmployeLaborById) throw new HttpException(404, " Please verify the EmployeLabour ID and try again.");
    return findEmployeLaborById;
  }

  public async deleteEmployeLaborById(employeLaborId:string):Promise<EmployeLabour>{
    const deleteEmployeLaborById:EmployeLabour = await this.Employee_Labor_Management_Model.findByIdAndDelete(employeLaborId);
    if (!deleteEmployeLaborById) throw new HttpException(404, "EmployeLabour not found. The EmployeLabour with the given ID may have already been deleted !");
    return deleteEmployeLaborById;
  }

}

export default employe_Labor_Service;
