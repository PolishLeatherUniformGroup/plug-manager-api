import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1725469455077 implements MigrationInterface {
    name = 'Migrations1725469455077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`config\` (\`key\` varchar(255) NOT NULL, \`value\` varchar(255) NULL, \`description\` varchar(255) NULL, \`valueType\` varchar(255) NOT NULL, PRIMARY KEY (\`key\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD \`shortcode\` varchar(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD UNIQUE INDEX \`IDX_943abc868f2e8f103876b66c0c\` (\`shortcode\`)`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`isPublished\` \`isPublished\` bit NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`showInMenu\` \`showInMenu\` bit NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`isDefault\` \`isDefault\` bit NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`langugeCode\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`langugeCode\` varchar(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`section\` CHANGE \`isPublished\` \`isPublished\` bit NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`section\` CHANGE \`showInMenu\` \`showInMenu\` bit NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`section\` DROP COLUMN \`languageCode\``);
        await queryRunner.query(`ALTER TABLE \`section\` ADD \`languageCode\` varchar(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`application_feature\` CHANGE \`enabled\` \`enabled\` bit NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`application_feature\` CHANGE \`enabled\` \`enabled\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`section\` DROP COLUMN \`languageCode\``);
        await queryRunner.query(`ALTER TABLE \`section\` ADD \`languageCode\` enum ('PL', 'EN') NOT NULL DEFAULT 'PL'`);
        await queryRunner.query(`ALTER TABLE \`section\` CHANGE \`showInMenu\` \`showInMenu\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`section\` CHANGE \`isPublished\` \`isPublished\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`langugeCode\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`langugeCode\` enum ('PL', 'EN') NOT NULL DEFAULT 'PL'`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`isDefault\` \`isDefault\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`showInMenu\` \`showInMenu\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`article\` CHANGE \`isPublished\` \`isPublished\` bit NOT NULL DEFAULT 'b'0''`);
        await queryRunner.query(`ALTER TABLE \`image\` DROP INDEX \`IDX_943abc868f2e8f103876b66c0c\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`shortcode\``);
        await queryRunner.query(`DROP TABLE \`config\``);
    }

}
