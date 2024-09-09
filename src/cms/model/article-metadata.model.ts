import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Section } from "./section.model";
import { Article } from "./article.model";

@Entity("cms_article_metadata")
export class ArticleMetadata {

    @Column({type: "text", nullable: true})
    keywords?: string;
    @Column({type: "text", nullable: true})
    description?: string;

    @OneToOne(() => Section, section => section.metadata)
    @JoinColumn({name: "article_id"})
    article?:Article;

}