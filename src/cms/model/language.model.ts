import { Column } from "typeorm";

export class Language{
    
    @Column({type: 'varchar', length: 2})
    code: string;
}