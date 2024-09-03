import { Metadata } from "./metadata.dto";

export class Section {
    id: number;
    title: string;
    slug: string;
    published: boolean;
    inMenu: boolean;
    language: string;
    order: number;
    parent?: number;
    metadata?: Metadata;
}