import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

const dotConfig = dotenvConfig({
    path: ['.env', '.env.local']
});

const config = {
    type: "mysql",
    host: `${dotConfig.parsed.DATABASE_HOST}`,
    port: `${dotConfig.parsed.DATABASE_PORT}`,
    username: `${dotConfig.parsed.DATABASE_USERNAME}`,
    password: `${dotConfig.parsed.DATABASE_PASSWORD}`,
    database: `${dotConfig.parsed.DATABASE_NAME}`,
    entities: ["dist/**/*.model{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true,
    logging: true
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);