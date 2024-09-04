import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('settings_values')
export class Config {

    @PrimaryColumn({ type: "varchar", length: 255 })
    key: string;

    @Column({ type: "varchar", length: 255 , nullable : true})
    value?: string;

    @Column({ type: "varchar", length: 255 , nullable : true})
    description?: string;

    @Column({ type: "varchar", length: 255 , })
    valueType: "string" | "number" | "boolean";
}