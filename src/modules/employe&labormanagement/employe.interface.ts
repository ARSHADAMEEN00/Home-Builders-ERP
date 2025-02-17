
import { Document } from 'mongoose';
import { ROLE, WORKSTATUS } from './employe.enum';
export interface EmployeLabour extends Document{
    name:string;
    role?:ROLE;
    contact:number;
    assignedSite:string;
    workStatus?:WORKSTATUS;
}

