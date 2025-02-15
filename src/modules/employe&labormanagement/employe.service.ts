import Employee_Labor_Management_Model from "./employe.model";



class employe_Labor_Service{
    public Employee_Labor_Management_Model = Employee_Labor_Management_Model;

    public async createEmploye_Labor_Management(body:any):Promise<any>{
        const createEmploye_Labor_Management = await this.Employee_Labor_Management_Model.create(body);
        return createEmploye_Labor_Management;
    }

}

export default employe_Labor_Service;