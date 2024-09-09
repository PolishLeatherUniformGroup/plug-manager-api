import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SectionContent } from "./section-content.model";
import { Updates } from "./udates.model";
import { Section } from "./section.model";
import { ArticleContent } from "./article-content.model";
import { BoolBitTransformer } from "../../shared/bit-transfomer";
import { Metadata } from "./metadata.model";

@Entity("cms_article")
export class Article {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Unique(["slug"])
    @Column({ type: "varchar", length: 150 })
    slug: string;

    @Column({ type: "int" })
    order: number;

    @Column({ type: "bit", default: false, transformer: new BoolBitTransformer() })
    isPublished: boolean;

    @ManyToOne(() => Section, section => section.articles)
    @JoinColumn({ name: "parentId" })
    parent: Section;

    @Column(() => Metadata)
    metadata?: Metadata

    @Column({ type: "bigint", nullable: false })
    parentId: number;

    @OneToMany(() => ArticleContent, content => content.article, { cascade: true, eager: true })
    content?: ArticleContent[];

    @Column(() => Updates)
    updates: Updates;

}