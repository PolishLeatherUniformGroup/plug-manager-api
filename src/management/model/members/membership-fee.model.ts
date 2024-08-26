import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.model";

@Entity()
export class MembershipFee {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public year: number;

    @Column()
    public dueAmount: number;

    @Column()
    public dueDate: Date;

    @Column()
    public paidAmount?: number;

    @Column()
    public paidDate?: Date;

    @ManyToOne(type => Member, member => member.membershipFees, {
        cascade: true,
        onDelete: 'RESTRICT',
    })
    public member: Member;
}