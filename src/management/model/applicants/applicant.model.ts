import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Address } from "../address.model";
import { Recommendation } from "./recommendation.model";
import { ApplicationFee } from "./application-fee.model";
import { ApplicationProcess } from "./application-process.model";
import { ApplicationStatus } from "./application-status.model";


@Entity('membership_applicants')
export class Applicant {
  @PrimaryColumn()
  public id: string;

  @Column({ length: 50 })
  public firstName: string;

  @Column({ length: 50 })
  public lastName: string;

  @Column({ length: 150 })
  public email: string;

  @Column({ length: 15 })
  public phone?: string;

  @Column()
  public birthDate: Date;

  @Column()
  public applyDate: Date;

  public status(): number {
    this.applicationStatuses.sort((a, b) => a.date.getTime() - b.date.getTime());
    return this.applicationStatuses[this.applicationStatuses.length - 1].status;
  }

  @Column(() => Address)
  public address: Address;

  @OneToMany(
    (type) => Recommendation,
    (recommendation) => recommendation.applicant,
    {
      cascade: true,
      onDelete: "CASCADE",
    },
  )
  public recommendations: Recommendation[];

  @OneToOne((type) => ApplicationFee, (applicationFee) => applicationFee.applicant, {
    cascade: true,
    onDelete: "CASCADE",
  })
  public applicationFee?: ApplicationFee;

  @OneToOne(
    (type) => ApplicationProcess,
    (applicationProcess) => applicationProcess.applicant,
    {
      cascade: true,
      onDelete: "CASCADE",
    },
  )

  @OneToMany(type => ApplicationStatus, applicationStatus => applicationStatus.applicant, {
    cascade: true,
    onDelete: "CASCADE",
  })
  public applicationStatuses: ApplicationStatus[];

  @OneToOne((type) => ApplicationProcess, (applicationProcess) => applicationProcess.applicant, {
    cascade: true,
    onDelete: "CASCADE",
  })
  public applicationProcess: ApplicationProcess;
}
