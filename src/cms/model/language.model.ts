import { Column } from "typeorm";

export class Language{
    
    @Column({type: 'enum', enum: ["PL", "EN"], default: "PL"})
    code: "PL" | "EN"
}