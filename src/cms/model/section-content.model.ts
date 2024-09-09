import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Section } from "./section.model";

@Entity("cms_section_content")
export class SectionContent {
    @PrimaryColumn({type: "bigint", name: "section_id"})
    sectionId: number;
    @PrimaryColumn({type: "varchar", length: 2})
    language: string;
    @Column({type: "varchar", length: 150})
    name: string;
    @Column({type: "varchar", length: 150})
    title: string;
    @ManyToOne(() => Section, section => section.content)
    section:Section;
}