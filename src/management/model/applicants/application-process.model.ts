import { App } from "supertest/types";
import { OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Applicant } from "./applicant.model";

export class ApplicationProcess {
    @PrimaryGeneratedColumn()
    public id: number;
    public applyDate: Date;
    public acceptDate?: Date;
    public rejectDate?: Date;
    public rejectionJsutification?: string;
    public appealDeadline?: Date;
    public appealDate?: Date;
    public appealJustification?: string;
    public appealDecisionJsutification?: string;
    public appealAcceptDate?: Date;
    public appealRejectDate?: Date;

    @OneToOne(() => Applicant, applicant => applicant.applicationProcess, {
        cascade: true,
        onDelete: 'RESTRICT',
    })
    public applicant: Applicant;
}