import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1725474805361 implements MigrationInterface {
    name = 'Migrations1725474805361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cms_images\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`shortcode\` varchar(64) NOT NULL, \`name\` varchar(255) NOT NULL, \`src\` varchar(255) NOT NULL, \`alt\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_11a31ba27307a5af94263128fa\` (\`shortcode\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`settings_features\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`enabled\` bit NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_1f33ae3b8d8cddef8a08e769e7\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cms_sections\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`slug\` varchar(64) NOT NULL, \`title\` varchar(255) NOT NULL, \`isPublished\` bit NOT NULL DEFAULT 0, \`showInMenu\` bit NOT NULL DEFAULT 0, \`order\` int NOT NULL DEFAULT '0', \`parentId\` bigint NULL, \`languageCode\` varchar(2) NOT NULL, \`updatesCreated_at\` datetime NOT NULL, \`updatesCreated_by\` varchar(255) NOT NULL, \`updatesUpdated_at\` datetime NULL, \`updatesUpdated_by\` varchar(255) NULL, \`updatesPublished_at\` datetime NULL, \`updatesPublished_by\` varchar(255) NULL, \`metadataDescription\` varchar(255) NULL, \`metadataKeywords\` varchar(255) NULL, UNIQUE INDEX \`IDX_1e2709b1161b06e0f081a077bd\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cms_articles\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`slug\` varchar(64) NOT NULL, \`title\` varchar(255) NOT NULL, \`isPublished\` bit NOT NULL DEFAULT 0, \`showInMenu\` bit NOT NULL DEFAULT 0, \`isDefault\` bit NOT NULL DEFAULT 0, \`order\` int NOT NULL DEFAULT 0, \`content\` text NULL, \`headerImage\` varchar(255) NULL, \`sectionId\` bigint NULL, \`updatesCreated_at\` datetime NOT NULL, \`updatesCreated_by\` varchar(255) NOT NULL, \`updatesUpdated_at\` datetime NULL, \`updatesUpdated_by\` varchar(255) NULL, \`updatesPublished_at\` datetime NULL, \`updatesPublished_by\` varchar(255) NULL, \`metadataDescription\` varchar(255) NULL, \`metadataKeywords\` varchar(255) NULL, \`langugeCode\` varchar(2) NOT NULL, UNIQUE INDEX \`IDX_13b50e3b2094783f3af45fe932\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`settings_values\` (\`key\` varchar(255) NOT NULL, \`value\` varchar(255) NULL, \`description\` varchar(255) NULL, \`valueType\` varchar(255) NOT NULL, PRIMARY KEY (\`key\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_member_suspensions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startDate\` datetime NOT NULL, \`justification\` varchar(255) NOT NULL, \`endDate\` datetime NOT NULL, \`appealDeadline\` datetime NOT NULL, \`appealDate\` datetime NOT NULL, \`appealJustification\` varchar(255) NOT NULL, \`appealAcceptDate\` datetime NOT NULL, \`appealRejectDate\` datetime NOT NULL, \`appealRejectionJustification\` varchar(255) NOT NULL, \`finished\` tinyint NOT NULL, \`memberId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_member_expulsions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startDate\` datetime NOT NULL, \`justification\` varchar(255) NOT NULL, \`appealDeadline\` datetime NOT NULL, \`appealDate\` datetime NOT NULL, \`appealJustification\` varchar(255) NOT NULL, \`appealAcceptDate\` datetime NOT NULL, \`appealRejectDate\` datetime NOT NULL, \`appealRejectionJustification\` varchar(255) NOT NULL, \`finished\` tinyint NOT NULL, \`memberId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membrship_members\` (\`id\` varchar(255) NOT NULL, \`cardNumber\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`birthDate\` datetime NULL, \`joinDate\` datetime NOT NULL, \`status\` int NOT NULL, \`terminationDate\` datetime NULL, \`addressCountry\` varchar(50) NOT NULL DEFAULT '', \`addressCity\` varchar(50) NOT NULL DEFAULT '', \`addressRegion\` varchar(50) NULL, \`addressPostalcode\` varchar(8) NOT NULL DEFAULT '', \`addressStreet\` varchar(50) NOT NULL DEFAULT '', \`addressHouse\` varchar(10) NOT NULL DEFAULT '', \`addressApartment\` varchar(10) NULL, UNIQUE INDEX \`IDX_ec07f83cbc35cafa3e35b8088a\` (\`cardNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_member_fees\` (\`id\` int NOT NULL AUTO_INCREMENT, \`year\` int NOT NULL, \`dueAmount\` int NOT NULL, \`dueDate\` datetime NOT NULL, \`paidAmount\` int NOT NULL, \`paidDate\` datetime NOT NULL, \`memberId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_fees\` (\`year\` int NOT NULL, \`baseAmount\` int NOT NULL, \`baseDue\` datetime NOT NULL, PRIMARY KEY (\`year\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_application_fees\` (\`applicantId\` varchar(255) NOT NULL, \`dueAmount\` int NULL, \`paidAmount\` int NULL, \`paidDate\` datetime NULL, PRIMARY KEY (\`applicantId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_application_processes\` (\`applicantId\` varchar(255) NOT NULL, \`applyDate\` datetime NOT NULL, \`acceptDate\` datetime NULL, \`rejectDate\` datetime NULL, \`rejectionJsutification\` varchar(255) NULL, \`appealDeadline\` datetime NULL, \`appealDate\` datetime NULL, \`appealJustification\` varchar(255) NULL, \`appealDecisionJsutification\` varchar(255) NULL, \`appealAcceptDate\` datetime NULL, \`appealRejectDate\` datetime NULL, PRIMARY KEY (\`applicantId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membrship_application_statuses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL, \`date\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`comment\` text NULL, \`applicantId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_applicants\` (\`id\` varchar(255) NOT NULL, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL, \`email\` varchar(150) NOT NULL, \`phone\` varchar(15) NOT NULL, \`birthDate\` datetime NOT NULL, \`applyDate\` datetime NOT NULL, \`addressCountry\` varchar(50) NOT NULL DEFAULT '', \`addressCity\` varchar(50) NOT NULL DEFAULT '', \`addressRegion\` varchar(50) NULL, \`addressPostalcode\` varchar(8) NOT NULL DEFAULT '', \`addressStreet\` varchar(50) NOT NULL DEFAULT '', \`addressHouse\` varchar(10) NOT NULL DEFAULT '', \`addressApartment\` varchar(10) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_applicant_recommendations\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`cardNumber\` varchar(10) NOT NULL, \`isValid\` bit NULL, \`isRecommended\` bit NULL, \`applicantId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_identifiers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`last\` int NOT NULL, UNIQUE INDEX \`IDX_296412663b5d738ea746c12992\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cms_sections\` ADD CONSTRAINT \`FK_f22fdce42342f9e6f349995ce97\` FOREIGN KEY (\`parentId\`) REFERENCES \`cms_sections\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cms_articles\` ADD CONSTRAINT \`FK_b1adb28eec33d0c6d4a8e004a6a\` FOREIGN KEY (\`sectionId\`) REFERENCES \`cms_sections\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`membership_member_suspensions\` ADD CONSTRAINT \`FK_119a1258b96a13bf24b8bb142c3\` FOREIGN KEY (\`memberId\`) REFERENCES \`membrship_members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`membership_member_expulsions\` ADD CONSTRAINT \`FK_ee8899417df2302b02c5bec98d2\` FOREIGN KEY (\`memberId\`) REFERENCES \`membrship_members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`membership_member_fees\` ADD CONSTRAINT \`FK_95ee47d4b7d215be7f373f93f5a\` FOREIGN KEY (\`memberId\`) REFERENCES \`membrship_members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`membership_application_fees\` ADD CONSTRAINT \`FK_06afc630f05a24cd105fbb7f3a1\` FOREIGN KEY (\`applicantId\`) REFERENCES \`membership_applicants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`membership_application_processes\` ADD CONSTRAINT \`FK_8e51f1e0614f55093ba70c8b75c\` FOREIGN KEY (\`applicantId\`) REFERENCES \`membership_applicants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`membrship_application_statuses\` ADD CONSTRAINT \`FK_524136dfa0b1f55d7467adec958\` FOREIGN KEY (\`applicantId\`) REFERENCES \`membership_applicants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`membership_applicant_recommendations\` ADD CONSTRAINT \`FK_dc9af4c7d5bf58552619a8275b0\` FOREIGN KEY (\`applicantId\`) REFERENCES \`membership_applicants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`membership_applicant_recommendations\` DROP FOREIGN KEY \`FK_dc9af4c7d5bf58552619a8275b0\``);
        await queryRunner.query(`ALTER TABLE \`membrship_application_statuses\` DROP FOREIGN KEY \`FK_524136dfa0b1f55d7467adec958\``);
        await queryRunner.query(`ALTER TABLE \`membership_application_processes\` DROP FOREIGN KEY \`FK_8e51f1e0614f55093ba70c8b75c\``);
        await queryRunner.query(`ALTER TABLE \`membership_application_fees\` DROP FOREIGN KEY \`FK_06afc630f05a24cd105fbb7f3a1\``);
        await queryRunner.query(`ALTER TABLE \`membership_member_fees\` DROP FOREIGN KEY \`FK_95ee47d4b7d215be7f373f93f5a\``);
        await queryRunner.query(`ALTER TABLE \`membership_member_expulsions\` DROP FOREIGN KEY \`FK_ee8899417df2302b02c5bec98d2\``);
        await queryRunner.query(`ALTER TABLE \`membership_member_suspensions\` DROP FOREIGN KEY \`FK_119a1258b96a13bf24b8bb142c3\``);
        await queryRunner.query(`ALTER TABLE \`cms_articles\` DROP FOREIGN KEY \`FK_b1adb28eec33d0c6d4a8e004a6a\``);
        await queryRunner.query(`ALTER TABLE \`cms_sections\` DROP FOREIGN KEY \`FK_f22fdce42342f9e6f349995ce97\``);
        await queryRunner.query(`DROP INDEX \`IDX_296412663b5d738ea746c12992\` ON \`membership_identifiers\``);
        await queryRunner.query(`DROP TABLE \`membership_identifiers\``);
        await queryRunner.query(`DROP TABLE \`membership_applicant_recommendations\``);
        await queryRunner.query(`DROP TABLE \`membership_applicants\``);
        await queryRunner.query(`DROP TABLE \`membrship_application_statuses\``);
        await queryRunner.query(`DROP TABLE \`membership_application_processes\``);
        await queryRunner.query(`DROP TABLE \`membership_application_fees\``);
        await queryRunner.query(`DROP TABLE \`membership_fees\``);
        await queryRunner.query(`DROP TABLE \`membership_member_fees\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec07f83cbc35cafa3e35b8088a\` ON \`membrship_members\``);
        await queryRunner.query(`DROP TABLE \`membrship_members\``);
        await queryRunner.query(`DROP TABLE \`membership_member_expulsions\``);
        await queryRunner.query(`DROP TABLE \`membership_member_suspensions\``);
        await queryRunner.query(`DROP TABLE \`settings_values\``);
        await queryRunner.query(`DROP INDEX \`IDX_13b50e3b2094783f3af45fe932\` ON \`cms_articles\``);
        await queryRunner.query(`DROP TABLE \`cms_articles\``);
        await queryRunner.query(`DROP INDEX \`IDX_1e2709b1161b06e0f081a077bd\` ON \`cms_sections\``);
        await queryRunner.query(`DROP TABLE \`cms_sections\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f33ae3b8d8cddef8a08e769e7\` ON \`settings_features\``);
        await queryRunner.query(`DROP TABLE \`settings_features\``);
        await queryRunner.query(`DROP INDEX \`IDX_11a31ba27307a5af94263128fa\` ON \`cms_images\``);
        await queryRunner.query(`DROP TABLE \`cms_images\``);
    }

}
