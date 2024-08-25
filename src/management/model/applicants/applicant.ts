import { Address } from "./address";

export class Applicant {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone?: string;
    public birthDate: Date;
    public applyDate: Date;
    public address: Address;
}

