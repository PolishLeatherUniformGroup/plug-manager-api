import { Address } from "../../model/address.model";

export class Apply {
    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber?: string;
    public address: Address;
    public recommenders: string[];
}