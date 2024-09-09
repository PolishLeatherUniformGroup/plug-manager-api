import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Section } from "./section.model";
import { Article } from "./article.model";

@Entity("cms_article_content")
export class ArticleContent {
    @PrimaryColumn({type: "bigint", name: "article_id"})
    articleId: number;
    @PrimaryColumn({type: "varchar", length: 2})
    language: string;
    @Column({type: "varchar", length: 150})
    name: string;
    @Column({type: "varchar", length: 150})
    title: string;
    @Column({type: "text"})
    text: string;
    @ManyToOne(() => Article, article => article.content)
    article:Article;
}