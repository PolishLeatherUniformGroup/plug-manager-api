import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.model";

@Entity()
export class Expulsion {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public startDate: Date;

  @Column()
  public justification: string;

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

  @ManyToOne((type) => Member, (member) => member.expulsions, {
    onDelete: "RESTRICT",
    cascade: true,
  })
  public member: Member;
}
