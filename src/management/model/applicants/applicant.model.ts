import { Column, Entity, PrimaryColumn } from "typeorm";
import { Address } from "./address.model";

@Entity()
export class Applicant {

    @PrimaryColumn()
    public id: string;

    @Column({length: 50})
    public firstName: string;   

    @Column({length: 50})
    public lastName: string;

    @Column({length: 150})
    public email: string;

    @Column({length: 15})
    public phone?: string;

    @Column()
    public birthDate: Date;

    @Column()
    public applyDate: Date;
    public address: Address;
}

