import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.model";

@Entity('membership_member_fees')
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

  @ManyToOne((type) => Member, (member) => member.membershipFees)
  public member: Member;
}
