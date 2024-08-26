import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Applicant } from "./applicant.model";

@Entity()
export class Recommendation {

    @PrimaryColumn()
    public id: string;

    @Column({ length: 10 })
    public cardNumber: string;

    @Column()
    public isValid?: boolean;

    @Column()
    public isRecommended?: boolean;

    @ManyToOne(type => Applicant, applicant => applicant.recommendations, {
        cascade: true,
        onDelete: 'NO ACTION',
    })
    public applicant: Applicant;
}