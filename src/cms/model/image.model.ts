import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Article } from "./article.model";

@Entity("cms_images")
export class Image {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({type: 'varchar', length: 64})
    @Unique(['shortcode'])
    shortcode: string;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    src: string;

    @Column({type: 'varchar', length: 255})
    alt?: string;

}