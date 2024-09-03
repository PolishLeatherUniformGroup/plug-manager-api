import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.model";

@Entity("image")
export class ArticleImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    src: string;

    @Column({type: 'varchar', length: 255})
    alt?: string;

    @ManyToOne(() => Article, article => article.images)
    article:Article;
}