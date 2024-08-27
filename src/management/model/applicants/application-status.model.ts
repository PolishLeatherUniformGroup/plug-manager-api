import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Applicant } from "./applicant.model";

@Entity()
export class ApplicationStatus {

    @PrimaryGeneratedColumn()
    public id:number;

    @Column()
    public status:number;

    @Column()
    public date:Date;

    @Column()
    public comment?:string;

    @ManyToOne(type=>Applicant, applicant=>applicant.applicationStatuses)
    public applicant:Applicant;
}