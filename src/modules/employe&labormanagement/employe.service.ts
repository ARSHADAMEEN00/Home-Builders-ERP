import { HttpException } from '@/exceptions/HttpException';
import { EmployeLabour } from './employe.interface';
import Employee_Labor_Management_Model from './employe.model';
import { Create_employe_laborDto } from './employe.dto';
import { toNumber } from 'lodash';
import moment from 'moment';

class employe_Labor_Service {
  public Employee_Labor_Management_Model = Employee_Labor_Management_Model;

  public async createEmploye_Labor_Management(body: any): Promise<EmployeLabour> {
    const createEmploye_Labor_Management = await this.Employee_Labor_Management_Model.create(body);
    if (!createEmploye_Labor_Management) throw new HttpException(500, 'something went wrong !');
    return createEmploye_Labor_Management;
  }

  public async getAllEmployeLabor(
    page: string,
    limit: string,
    query: any,
  ): Promise<{ getAllEmployeLaborList: EmployeLabour[]; total: number; page: string }> {
    let queryData = {};
    if (query.status) {
      queryData['workStatus'] = query.status;
    }

    if (query.search) {
      queryData['$or'] = [
        { name: { $regex: query?.search ? query?.search : '', $options: 'i' } },
        { role: { $regex: query?.search ? query?.search : '', $options: 'i' } },
        { contact: { $regex: query?.search ? query?.search : '', $options: 'i' } },
      ];
    }
    if (query.from && query.to) {
      const from = moment(query.from, 'YYYY/MM/DD').startOf('day');
      const to = moment(query.to, 'YYYY/MM/DD').endOf('day');
      queryData['createdAt'] = { $gte: from, $lte: to };
    }

    const getAllEmployeLaborList: EmployeLabour[] = await this.Employee_Labor_Management_Model.find(queryData)
      .sort({ createdAt: -1 })
      .limit(toNumber(limit))
      .skip((toNumber(page) - 1) * toNumber(limit));

    if (getAllEmployeLaborList.length == 0) throw new HttpException(404, 'No employee labor records found. Please add data to view the list !');
    const total = await this.Employee_Labor_Management_Model.countDocuments(queryData);
    return { getAllEmployeLaborList, total, page };
  }

  public async updateEmployeLaborById(employeLaborId: string, employeLaborData: Create_employe_laborDto): Promise<EmployeLabour> {
    const updateEmployeLabor = await this.Employee_Labor_Management_Model.findByIdAndUpdate(employeLaborId, employeLaborData, { new: true });
    if (!updateEmployeLabor) throw new HttpException(404, 'EmployeLabour not found. Please verify the EmployeLabour ID and try again.');
    return updateEmployeLabor;
  }

  public async findEmployeLaborById(employeLaborId: string): Promise<EmployeLabour> {
    const findEmployeLaborById: EmployeLabour = await this.Employee_Labor_Management_Model.findById(employeLaborId);
    if (!findEmployeLaborById) throw new HttpException(404, ' Please verify the EmployeLabour ID and try again.');
    return findEmployeLaborById;
  }

  public async deleteEmployeLaborById(employeLaborId: string): Promise<EmployeLabour> {
    const deleteEmployeLaborById: EmployeLabour = await this.Employee_Labor_Management_Model.findByIdAndDelete(employeLaborId);
    if (!deleteEmployeLaborById)
      throw new HttpException(404, 'EmployeLabour not found. The EmployeLabour with the given ID may have already been deleted !');
    return deleteEmployeLaborById;
  }
}

export default employe_Labor_Service;
