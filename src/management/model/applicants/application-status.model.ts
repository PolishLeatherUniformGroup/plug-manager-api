import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Applicant } from "./applicant.model";

@Entity('membership_application_statuses')
export class ApplicationStatus {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public status: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    public date: Date;

    @Column({ type: 'text', nullable: true })
    public comment?: string;

    @ManyToOne(type => Applicant, applicant => applicant.applicationStatuses)
    public applicant: Applicant;
}