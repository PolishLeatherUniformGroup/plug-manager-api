import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Section } from "./section.model";
import { Metadata } from "./metadata.model";
import { Updates } from "./updates.model";
import { Language } from "./language.model";
import { ArticleImage } from "./article-image.model";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 64})
    @Unique(["slug"])
    slug: string;

    @Column({type: 'varchar', length: 255})
    title: string;

    @Column({type: 'bit', default: 0})
    isPublished: boolean;
    @Column({type: 'bit', default: 0})
    showInMenu: boolean;
    @Column({type: 'bit', default: 0})
    isDefault: boolean;
    @Column({type: 'int', default: 0})
    order: number;

    @Column({type: 'text', nullable: true})
    content: string;

    @Column({type: 'varchar', length:255, nullable: true})
    headerImage?: string;

    @OneToMany(() => ArticleImage, articleImage => articleImage.article)
    images: ArticleImage[];

    @Column(() => Updates)
    updates: Updates;

    @Column(() => Metadata)
    metadata: Metadata;

    @Column(() => Language)
    languge: Language;

    @ManyToOne(() => Section, section => section.articles)
    section: Section;
}