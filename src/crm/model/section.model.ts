import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Updates } from "./updates.model";
import { Metadata } from "./metadata.model";
import { Article } from "./article.model";
import { Language } from "./language.model";

@Entity()
export class Section {

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

    @Column({type: 'text', nullable: true})
    content?: string;

    @Column(() => Language)
    language: Language;

    @Column(() => Updates)
    updates: Updates;

    @Column(() => Metadata)
    metadata: Metadata;

    @OneToMany(() => Article, article => article.section)
    articles: Article[];


}