import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Fee {
    @PrimaryColumn()
    year: number;
    @Column()
    baseAmount: number;
    @Column()
    baseDue: Date;
}