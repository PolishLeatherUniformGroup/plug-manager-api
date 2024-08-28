import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Applicant } from "./applicant.model";

@Entity()
export class ApplicationFee {
  @PrimaryColumn()
  public applicantId: string;
  @Column()
  public dueAmount?: number;
  @Column()
  public paidAmount?: number;
  @Column()
  public paidDate?: Date;
  @OneToOne(() => Applicant, (applicant) => applicant.applicationFee)
  @JoinColumn({ name: "applicantId" })
  public applicant: Applicant
}
