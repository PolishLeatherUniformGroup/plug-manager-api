import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.model";

@Entity()
export class Suspension {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public startDate: Date;

  @Column()
  public justification: string;

  @Column()
  public endDate: Date;

  @Column()
  public appealDeadline: Date;

  @Column()
  public appealDate?: Date;

  @Column()
  public appealJustification?: string;

  @Column()
  public appealAcceptDate?: Date;

  @Column()
  public appealRejectDate?: Date;

  @Column()
  public appealRejectionJustification?: string;

  @Column()
  public finished: boolean;

  @ManyToOne((type) => Member, (member) => member.suspensions, {
    onDelete: "RESTRICT",
    cascade: true,
  })
  public member: Member;
}
