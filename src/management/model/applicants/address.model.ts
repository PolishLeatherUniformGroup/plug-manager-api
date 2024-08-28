import { ChildEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Applicant } from "./applicant.model";

@Entity()
export class ApplicantAddress {
  @PrimaryColumn()
  applicantId: string;
  @Column({ length: 50 })
  country: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50, nullable: true })
  region?: string;

  @Column({ length: 8 })
  postalCode: string;

  @Column({ length: 50 })
  street: string;

  @Column({ length: 10 })
  house: string;

  @Column({ length: 10, nullable: true })
  apartment?: string;

  @OneToOne((type) => Applicant, (applicant) => applicant.address)
  @JoinColumn({ name: "applicantId" })
  applicant: Applicant
}
