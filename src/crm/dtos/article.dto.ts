import { Metadata } from "./metadata.dto";

export class Article{
    id: number;
    title: string;
    slug: string;
    content: string;
    headerImage?: string;
    published: boolean;
    inMenu: boolean;
    isDefault: boolean;
    language: string;
    order: number;
    section: number;
    metadata?: Metadata;
}