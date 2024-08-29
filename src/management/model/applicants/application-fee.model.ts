import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Applicant } from "./applicant.model";

@Entity()
export class ApplicationFee {
  @PrimaryColumn()
  public applicantId: string;
  @Column({nullable: true})
  public dueAmount?: number;
  @Column({nullable: true})
  public paidAmount?: number;
  @Column({nullable: true})
  public paidDate?: Date;
  @OneToOne(() => Applicant, (applicant) => applicant.applicationFee)
  @JoinColumn({ name: "applicantId" })
  public applicant: Applicant
}
