import { environment } from "src/environments/environment";

const baseUrl = `${environment.localAPIUrl}`;
export class AppConstants {

    public static uploadUrl = `${baseUrl}` + "file/upload";

    public static GET_IMAGE_PATH(image: string) {
        return `${baseUrl}` + "file/image/" + image;
    }

    public static POST_DO_LOGIN() {
        return `${baseUrl}` + "user/login";
    }
    public static DO_CHECK_OTP() {
        return `${baseUrl}` + "user/verifyOtp";
    }

    public static POST_CREAE_LEAD() {
        return `${baseUrl}` + "lead/add";
    }

    public static GET_ALL_LEADS() {
        return `${baseUrl}` + "lead/all";
    }
    public static GET_LEADS_BY_ID(id: any) {
        return `${baseUrl}` + "lead/" + id;
    }
    public static POST_CREAE_PROPERTY() {
        return `${baseUrl}` + "property/add";
    }

    public static GET_ALL_PROPERTIES() {
        return `${baseUrl}` + "property/all";
    }

    public static PUT_UPDATE_LEAD(leadId: number) {
        return `${baseUrl}` + "lead/" + leadId;
    }

    public static GET_PROPERTY_BY_ID(propertyId: number) {
        return `${baseUrl}` + "property/" + propertyId;
    }

    public static PUT_UPDATE_PROPERTY(propertyId: number) {
        return `${baseUrl}` + "property/" + propertyId;
    }

    public static DELETE_PROPERTY_BY_ID(propertyId: number) {
        return `${baseUrl}` + "property/" + propertyId;
    }


    public static DELETE_LEADS_BY_ID(leadId: number) {
        return `${baseUrl}` + "lead/" + leadId;
    }

    public static POST_CREAE_EMPLOYEE() {
        return `${baseUrl}` + "employee/add";
    }

    public static GET_ALL_EMPLOYEES() {
        return `${baseUrl}` + "employee/all";
    }

    public static GET_EMPLOYESS_BY_ID(employeeId: number) {
        return `${baseUrl}` + "employee/" + employeeId;
    }

    public static PUT_UPDATE_EMPLOYESS(employeeId: number) {
        return `${baseUrl}` + "employee/" + employeeId;
    }

    public static DELETE_EMPLOYESS_BY_ID(employeeId: number) {
        return `${baseUrl}` + "employee/" + employeeId;
    }

    public static GET_ALL_ROLES() {
        return `${baseUrl}` + "role/all";
    }
    public static GET_ALL_ROLES_BY_DEPARTMENT(department: String) {
        return `${baseUrl}` + "role/all/" + department;
    }

    public static POST_CREAE_ROLE() {
        return `${baseUrl}` + "role/add";
    }

    public static GET_ROLE_BY_ID(roleId: number) {
        return `${baseUrl}` + "role/" + roleId;
    }

    public static PUT_UPDATE_ROLE(roleId: number) {
        return `${baseUrl}` + "role/" + roleId;
    }

    public static DELETE_ROLE_BY_ID(roleId: number) {
        return `${baseUrl}` + "role/" + roleId;
    }

    public static POST_CREAE_DEALS(): string {
        return `${baseUrl}` + "deals/add";
    }
    public static GET_ALL_DEALS(): string {
        return `${baseUrl}` + "deals/all";
    }
    public static GET_DEALS_BY_ID(id: any): string {
        return `${baseUrl}` + "deals/one/" + id;
    }
    public static PUT_UPDATE_DEALS(id: any): string {
        return `${baseUrl}` + "deals/" + id;
    }
    public static DELETE_DEALS_BY_ID(id: any): string {
        return `${baseUrl}` + "deals/" + id;
    }
}