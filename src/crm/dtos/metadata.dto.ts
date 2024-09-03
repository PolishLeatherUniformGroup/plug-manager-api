import { Updates } from "./updates.dto";

export class Metadata {
    description?: string;
    keywords?: string[];
    history: Updates;
}