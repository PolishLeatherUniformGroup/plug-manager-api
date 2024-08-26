import { Column, PrimaryColumn } from "typeorm";

export class MemberCard {
    @PrimaryColumn()
    id: string;
    
    @Column()
    last: number;
}