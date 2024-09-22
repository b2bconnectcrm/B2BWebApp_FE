import { Address } from "./address.model";

export interface Lead {

    id?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    occupation?: string;
    mobile?: string;
    email?: string;
    address?: Address;
    annualIncome?: string;
    industry?: string;
    leadSource?: string;
    leadStatus?: string;
    createdDate?: string;
	
}