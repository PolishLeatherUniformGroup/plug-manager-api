import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('membership_fees')
export class Fee {
    @PrimaryColumn()
    year: number;
    @Column()
    baseAmount: number;
    @Column()
    baseDue: Date;
}