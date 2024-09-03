import { Column } from "typeorm";

export class Updates {
    @Column()
    created_at: Date;

    @Column()
    created_by: string;

    @Column({nullable: true})
    updated_at?: Date;
    @Column({nullable: true})
    updated_by?: string;

    @Column({nullable: true})
    published_at?: Date;
    @Column({nullable: true})
    published_by?: string;
}