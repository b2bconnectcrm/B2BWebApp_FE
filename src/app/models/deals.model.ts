import { Employee } from "./employee.model";
import { Lead } from "./lead.model";

export interface Deals {

     id?: number;

     dealName: string;

     clientName: string;

     accountName: string;

     SalesPipeline: string;

     stage: string;

     unitStatus: string;

     pancardFilePath: string;

     pancardNumber: string;

     amount: number;

     forcastCategory: string;

     commissionPercent: string;

     closingDate: string;

     phone: string;

     projectType: string;

     subProjectType: string;

     referredBy: string;

     employeeId: number;

     leadId: number;

     employeeDto: Employee;

     leadDto: Lead;
}