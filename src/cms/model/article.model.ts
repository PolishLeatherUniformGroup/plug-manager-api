import { Column, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SectionContent } from "./section-content.model";
import { Updates } from "./udates.model";
import { Section } from "./section.model";
import { ArticleContent } from "./article-content.model";
import { ArticleMetadata } from "./article-metadata.model";

export class Article{
    @PrimaryGeneratedColumn()
    id: number;

    @Unique(["slug"])
    slug: string;

    @Column({type:"int"})
    order: number;

    @Column({type:"bit" , default: false})
    isPublished: boolean;


    @ManyToOne(() => Section, section => section.articles)
    parent: Section;

    @OneToOne(() => ArticleMetadata, metadata => metadata.article, {cascade: true, eager: true})    
    metadata?: ArticleMetadata;

    @OneToMany(() => SectionContent, content => content.section, {cascade: true, eager: true})
    content?: ArticleContent[];

    @Column(()=> Updates)
    updates: Updates;

}