import { Column } from "typeorm";

export class Metadata {
    @Column({ type: "text", nullable: true })
    keywords?: string;
    @Column({ type: "text", nullable: true })
    description?: string;

}