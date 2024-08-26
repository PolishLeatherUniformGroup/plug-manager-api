import { Column, Entity, OneToMany, PrimaryColumn, Unique } from "typeorm";
import { Address } from "../address.model";
import { MembershipFee } from "./membership-fee.model";

@Entity()
export class Member {

    @PrimaryColumn()
    public id: string;

    @Column()
    @Unique(["cardNumber"])
    public cardNumber: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public email: string;

    @Column()
    public phoneNumber?: string;

    @Column()
    public birthDate: Date;

    @Column(type => Address)
    public address: Address;

    @Column()
    public joinDate: Date;

    @OneToMany(type => MembershipFee, membershipFee => membershipFee.member, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    public membershipFees: MembershipFee[];
}