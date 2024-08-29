import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Identifier {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", length: 100 })
    @Unique(["name"])
    name: string;

    @Column({ type: "int" })
    last: number

}