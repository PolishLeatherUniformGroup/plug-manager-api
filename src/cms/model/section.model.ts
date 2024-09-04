import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Updates } from "./updates.model";
import { Metadata } from "./metadata.model";
import { Article } from "./article.model";
import { Language } from "./language.model";

@Entity('cms_sections')
export class Section {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'varchar', length: 64 })
    @Unique(["slug"])
    slug: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'bit', default: false })
    isPublished: boolean;
    @Column({ type: 'bit', default: false })
    showInMenu: boolean;

    @Column({ type: 'int', default: 0 })
    order: number;

    @Column(() => Language)
    language: Language;

    @Column(() => Updates)
    updates: Updates;

    @Column(() => Metadata)
    metadata: Metadata;

    @ManyToOne((type) => Section, (section) => section.children)
    parent?: Section;

    @OneToMany((type) => Section, (section) => section.parent)
    children: Section[]

    @OneToMany(() => Article, article => article.section)
    articles: Article[];


}