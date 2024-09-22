import { Address } from "./address.model";

export interface Property {

    id?: number;
    propertyName?: string;
    companyName?: string;
    reraNumber?: string;
    guidelineValue?: string;
    propertyType?: string;
    totalPlots?: string;
    address?: Address;
    poc?: string;
    mobile?: string;
    amenities?: string;
    startDate?: any;
    extensionDate?: any;

    propertyDescription?: string;
    status?: string;

    propertyMap?: string;
}

