import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Applicant } from "./applicant.model";

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: number;

  @Column({ length: 10 })
  public cardNumber: string;

  @Column({ type: 'bit', nullable: true })
  public isValid?: boolean;

  @Column({ type: 'bit', nullable: true })
  public isRecommended?: boolean;

  @ManyToOne((type) => Applicant, (applicant) => applicant.recommendations)
  public applicant: Applicant;
}
