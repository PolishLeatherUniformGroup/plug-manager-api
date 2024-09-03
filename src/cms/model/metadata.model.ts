import { Column } from "typeorm";

export class Metadata {
    @Column({type: 'varchar', length: 255, nullable: true})
    description?: string;
    @Column({type: 'varchar', length: 255, nullable: true})
    keywords?: string;
}