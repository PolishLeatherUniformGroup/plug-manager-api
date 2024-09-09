import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('settings_values')
export class SettingValue {

    @PrimaryColumn({ type: "varchar", length: 255 })
    key: string;

    @Column({ type: "varchar", length: 255 })
    group: string;

    @Column({type: 'varchar', length:255})
    name:string;

    @Column({ type: "varchar", length: 255 , nullable : true})
    value?: string;

    @Column({ type: "varchar", length: 255 , nullable : true})
    description?: string;

    @Column({ type: "varchar", length: 255 , })
    valueType: "string" | "number" | "boolean";
}