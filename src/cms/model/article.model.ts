import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Section } from "./section.model";
import { Metadata } from "./metadata.model";
import { Updates } from "./updates.model";
import { Language } from "./language.model";
import { Image } from "./image.model";

@Entity()
export class Article {
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
    @Column({ type: 'bit', default: false })
    isDefault: boolean;
    @Column({ type: 'int', default: false })
    order: number;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    headerImage?: string;

    @Column(() => Updates)
    updates: Updates;

    @Column(() => Metadata)
    metadata: Metadata;

    @Column(() => Language)
    languge: Language;

    @ManyToOne(() => Section, section => section.articles)
    section: Section;
}