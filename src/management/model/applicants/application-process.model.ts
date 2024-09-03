import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Applicant } from "./applicant.model";

@Entity()
export class ApplicationProcess {
  @PrimaryColumn()
  public applicantId: string;

  @Column()
  public applyDate: Date;

  @Column({nullable: true})
  public acceptDate?: Date;

  @Column({nullable: true})
  public rejectDate?: Date;

  @Column({nullable: true})
  public rejectionJsutification?: string;

  @Column({nullable: true})
  public appealDeadline?: Date;

  @Column({nullable: true})
  public appealDate?: Date;

  @Column({nullable: true})
  public appealJustification?: string;

  @Column({nullable: true})
  public appealDecisionJsutification?: string;

  @Column({nullable: true})
  public appealAcceptDate?: Date;

  @Column({nullable: true})
  public appealRejectDate?: Date;

  @OneToOne(() => Applicant, (applicant) => applicant.applicationProcess)
  @JoinColumn({ name: "applicantId" })
  public applicant: Applicant;
}
