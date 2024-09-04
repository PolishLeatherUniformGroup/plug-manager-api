import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BoolBitTransformer } from '../../shared/bit-transfomer';
@Entity('settings_features')
export class ApplicationFeature {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: "varchar", length: 255 })
    @Unique(["key"])
    key: string;
    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    description: string;

    @Column({
        type: 'bit',
        nullable: false,
        default: false,
        name: 'enabled',
        transformer: new BoolBitTransformer()
    })
    enabled: boolean;

}