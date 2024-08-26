import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Applicant } from "./applicant.model";

@Entity()
export class ApplicationProcess {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public applyDate: Date;

  @Column()
  public acceptDate?: Date;

  @Column()
  public rejectDate?: Date;

  @Column()
  public rejectionJsutification?: string;

  @Column()
  public appealDeadline?: Date;

  @Column()
  public appealDate?: Date;

  @Column()
  public appealJustification?: string;

  @Column()
  public appealDecisionJsutification?: string;

  @Column()
  public appealAcceptDate?: Date;

  @Column()
  public appealRejectDate?: Date;

  @OneToOne(() => Applicant, (applicant) => applicant.applicationProcess)
  public applicant: Applicant;
}
