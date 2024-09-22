import { Role } from "./role.model";

export interface UserAccount {
    id?: number;
    username?: string;
    password?: string;
    mobile?: string;
    otp?: string;
    role?: Role;
    loginType?: string;
}

