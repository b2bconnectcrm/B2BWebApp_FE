import { Address } from "./address.model";
import { Role } from "./role.model";
import { UserAccount } from "./user.model";

export interface Employee {

    id?: number;
    name: string;
    mobile?: string;
    email?: string;
    address?: Address;
    aadharNumber?: string;
    pancardNumber?: string;
    username?: string;
    department?: string;
    aadharFilePath?: string;
    pancardFilePath?: string;
    userAccount?: UserAccount;
    role?: Role;
}

	
	