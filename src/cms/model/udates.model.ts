import { Column } from "typeorm";

export class Updates {
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;   
    @Column({type: "varchar", length: 50}) 
    createdBy: string;
    @Column({type: "timestamp", nullable: true})
    updatedAt?: Date;
    @Column({type: "varchar", length: 50, nullable: true}) 
    updatedBy?: string;
    @Column({type: "timestamp", nullable: true})
    publihedAt?: Date;
    @Column({type: "varchar", length: 50, nullable: true}) 
    publishedBy?: string;
}