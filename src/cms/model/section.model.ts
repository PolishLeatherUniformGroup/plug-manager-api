import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Metadata } from "./metadata.model";
import { SectionContent } from "./section-content.model";
import { Updates } from "./udates.model";
import { Article } from "./article.model";
import { BoolBitTransformer } from "../../shared/bit-transfomer";

@Entity("cms_section")
export class Section {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Unique(["slug"])
    @Column({ type: "varchar", length: 150 })
    slug: string;

    @Column({ type: "int" })
    order: number;

    @Column({ type: "bit", default: false, transformer: new BoolBitTransformer() })
    isPublished: boolean;

    @Column({ type: "bit", default: false, transformer: new BoolBitTransformer() })
    showInMenu: boolean;

    @Column(() => Metadata)
    metadata?: Metadata;

    @OneToMany(() => SectionContent, content => content.section, { cascade: true, })
    content?: SectionContent[];

    @Column(() => Updates)
    updates: Updates;

    @OneToMany(() => Article, article => article.parent, { cascade: true })
    articles: Article[];

    @ManyToOne(() => Section, section => section.children, { nullable: true })
    parent?: Section;

    @OneToMany(() => Section, section => section.parent)
    children?: Section[];

}