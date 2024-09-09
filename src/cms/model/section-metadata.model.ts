import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Section } from "./section.model";

@Entity("cms_section_metadata")
export class SectionMetadata {

    @Column({type: "text", nullable: true})
    keywords?: string;
    @Column({type: "text", nullable: true})
    description?: string;

    @OneToOne(() => Section, section => section.metadata)
    @JoinColumn({name: "section_id"})
    section?:Section;

}