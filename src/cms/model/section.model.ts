import { Column, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SectionMetadata } from "./section-metadata.model";
import { SectionContent } from "./section-content.model";
import { Updates } from "./udates.model";
import { Article } from "./article.model";

export class Section{
    @PrimaryGeneratedColumn({type: "bigint", name: "section_id"})
    id: number;

    @Unique(["slug"])
    slug: string;

    @Column({type:"int"})
    order: number;

    @Column({type:"bit" , default: false})
    isPublished: boolean;

    @Column({type:"bit" , default: false})
    showInMenu: boolean;

    @OneToMany(() => Section, section => section.children)
    parent?: Section;

    @ManyToOne(() => Section, section => section.parent)
    children?: Section[];

    @OneToOne(() => SectionMetadata, metadata => metadata.section, {cascade: true, eager: true})    
    metadata?: SectionMetadata;

    @OneToMany(() => SectionContent, content => content.section, {cascade: true, eager: true})
    content?: SectionContent[];

    @Column(()=> Updates)
    updates: Updates;

    @OneToMany(() => Article, article => article.parent)
    articles: Article[];

}