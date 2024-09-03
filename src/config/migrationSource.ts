import * as dotenv from 'dotenv';
const dotConfig = dotenv.config({ path: ['.env', '.env.local'] });
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'mysql',
    host: `${dotConfig.parsed.DATABASE_HOST}`,
    port: +`${dotConfig.parsed.DATABASE_PORT}`,
    username: `${dotConfig.parsed.DATABASE_USERNAME}`,
    password: `${dotConfig.parsed.DATABASE_PASSWORD}`,
    database: `${dotConfig.parsed.DATABASE_NAME}`,
    synchronize: false,
    dropSchema: false,
    logging: true,
    entities: ['dist/management/model/**/*.model{.ts,.js}',
        'dist/crm/model/*.model{.ts,.js}',
    ],
    migrations: ['src/migrations/**/*.ts'],
    migrationsTableName: 'migration_table',
});