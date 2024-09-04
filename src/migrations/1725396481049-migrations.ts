import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1725396481049 implements MigrationInterface {
    name = 'Migrations1725396481049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`article\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`slug\` varchar(64) NOT NULL, \`title\` varchar(255) NOT NULL, \`isPublished\` bit NOT NULL DEFAULT 0, \`showInMenu\` bit NOT NULL DEFAULT 0, \`isDefault\` bit NOT NULL DEFAULT 0, \`order\` int NOT NULL DEFAULT 0, \`content\` text NULL, \`headerImage\` varchar(255) NULL, \`sectionId\` bigint NULL, \`updatesCreated_at\` datetime NOT NULL, \`updatesCreated_by\` varchar(255) NOT NULL, \`updatesUpdated_at\` datetime NULL, \`updatesUpdated_by\` varchar(255) NULL, \`updatesPublished_at\` datetime NULL, \`updatesPublished_by\` varchar(255) NULL, \`metadataDescription\` varchar(255) NULL, \`metadataKeywords\` varchar(255) NULL, \`langugeCode\` enum ('PL', 'EN') NOT NULL DEFAULT 'PL', UNIQUE INDEX \`IDX_0ab85f4be07b22d79906671d72\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`section\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`slug\` varchar(64) NOT NULL, \`title\` varchar(255) NOT NULL, \`isPublished\` bit NOT NULL DEFAULT 0, \`showInMenu\` bit NOT NULL DEFAULT 0, \`order\` int NOT NULL DEFAULT '0', \`parentId\` bigint NULL, \`languageCode\` enum ('PL', 'EN') NOT NULL DEFAULT 'PL', \`updatesCreated_at\` datetime NOT NULL, \`updatesCreated_by\` varchar(255) NOT NULL, \`updatesUpdated_at\` datetime NULL, \`updatesUpdated_by\` varchar(255) NULL, \`updatesPublished_at\` datetime NULL, \`updatesPublished_by\` varchar(255) NULL, \`metadataDescription\` varchar(255) NULL, \`metadataKeywords\` varchar(255) NULL, UNIQUE INDEX \`IDX_3a08a1120590b23c33bbbc45e1\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`src\` varchar(255) NOT NULL, \`alt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application_feature\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`enabled\` bit NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`identifier\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`last\` int NOT NULL, UNIQUE INDEX \`IDX_1471a598e418e1b2e1cfd0f9d1\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`fee\` (\`year\` int NOT NULL, \`baseAmount\` int NOT NULL, \`baseDue\` datetime NOT NULL, PRIMARY KEY (\`year\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`membership_fee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`year\` int NOT NULL, \`dueAmount\` int NOT NULL, \`dueDate\` datetime NOT NULL, \`paidAmount\` int NOT NULL, \`paidDate\` datetime NOT NULL, \`memberId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`expulsion\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startDate\` datetime NOT NULL, \`justification\` varchar(255) NOT NULL, \`appealDeadline\` datetime NOT NULL, \`appealDate\` datetime NOT NULL, \`appealJustification\` varchar(255) NOT NULL, \`appealAcceptDate\` datetime NOT NULL, \`appealRejectDate\` datetime NOT NULL, \`appealRejectionJustification\` varchar(255) NOT NULL, \`finished\` tinyint NOT NULL, \`memberId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`member\` (\`id\` varchar(255) NOT NULL, \`cardNumber\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`birthDate\` datetime NULL, \`joinDate\` datetime NOT NULL, \`status\` int NOT NULL, \`terminationDate\` datetime NULL, \`addressCountry\` varchar(50) NOT NULL DEFAULT '', \`addressCity\` varchar(50) NOT NULL DEFAULT '', \`addressRegion\` varchar(50) NULL, \`addressPostalcode\` varchar(8) NOT NULL DEFAULT '', \`addressStreet\` varchar(50) NOT NULL DEFAULT '', \`addressHouse\` varchar(10) NOT NULL DEFAULT '', \`addressApartment\` varchar(10) NULL, UNIQUE INDEX \`IDX_6f1d86a57bbcd35c684c23be72\` (\`cardNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`suspension\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startDate\` datetime NOT NULL, \`justification\` varchar(255) NOT NULL, \`endDate\` datetime NOT NULL, \`appealDeadline\` datetime NOT NULL, \`appealDate\` datetime NOT NULL, \`appealJustification\` varchar(255) NOT NULL, \`appealAcceptDate\` datetime NOT NULL, \`appealRejectDate\` datetime NOT NULL, \`appealRejectionJustification\` varchar(255) NOT NULL, \`finished\` tinyint NOT NULL, \`memberId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application_fee\` (\`applicantId\` varchar(255) NOT NULL, \`dueAmount\` int NULL, \`paidAmount\` int NULL, \`paidDate\` datetime NULL, PRIMARY KEY (\`applicantId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application_process\` (\`applicantId\` varchar(255) NOT NULL, \`applyDate\` datetime NOT NULL, \`acceptDate\` datetime NULL, \`rejectDate\` datetime NULL, \`rejectionJsutification\` varchar(255) NULL, \`appealDeadline\` datetime NULL, \`appealDate\` datetime NULL, \`appealJustification\` varchar(255) NULL, \`appealDecisionJsutification\` varchar(255) NULL, \`appealAcceptDate\` datetime NULL, \`appealRejectDate\` datetime NULL, PRIMARY KEY (\`applicantId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application_status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL, \`date\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`comment\` text NULL, \`applicantId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`applicant\` (\`id\` varchar(255) NOT NULL, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NOT NULL, \`email\` varchar(150) NOT NULL, \`phone\` varchar(15) NOT NULL, \`birthDate\` datetime NOT NULL, \`applyDate\` datetime NOT NULL, \`addressCountry\` varchar(50) NOT NULL DEFAULT '', \`addressCity\` varchar(50) NOT NULL DEFAULT '', \`addressRegion\` varchar(50) NULL, \`addressPostalcode\` varchar(8) NOT NULL DEFAULT '', \`addressStreet\` varchar(50) NOT NULL DEFAULT '', \`addressHouse\` varchar(10) NOT NULL DEFAULT '', \`addressApartment\` varchar(10) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recommendation\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`cardNumber\` varchar(10) NOT NULL, \`isValid\` bit NULL, \`isRecommended\` bit NULL, \`applicantId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD CONSTRAINT \`FK_3a0b4db0ebe5e37bc9b09c4129c\` FOREIGN KEY (\`sectionId\`) REFERENCES \`section\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`section\` ADD CONSTRAINT \`FK_9f961c619507c4d6276251445c8\` FOREIGN KEY (\`parentId\`) REFERENCES \`section\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`membership_fee\` ADD CONSTRAINT \`FK_ff4eea3b86bceb3a7036dc502de\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expulsion\` ADD CONSTRAINT \`FK_88695a60fc756c7d19ec85ebee6\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`suspension\` ADD CONSTRAINT \`FK_e3fc77bd6d60c67bdc4fc981019\` FOREIGN KEY (\`memberId\`) REFERENCES \`member\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_fee\` ADD CONSTRAINT \`FK_dd052e17e3620318022708bb80a\` FOREIGN KEY (\`applicantId\`) REFERENCES \`applicant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_process\` ADD CONSTRAINT \`FK_cbb645fb502a0a1b6515d854312\` FOREIGN KEY (\`applicantId\`) REFERENCES \`applicant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_status\` ADD CONSTRAINT \`FK_a890262443a7b6432885970d03e\` FOREIGN KEY (\`applicantId\`) REFERENCES \`applicant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recommendation\` ADD CONSTRAINT \`FK_082e458ec63beae428582699f1f\` FOREIGN KEY (\`applicantId\`) REFERENCES \`applicant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recommendation\` DROP FOREIGN KEY \`FK_082e458ec63beae428582699f1f\``);
        await queryRunner.query(`ALTER TABLE \`application_status\` DROP FOREIGN KEY \`FK_a890262443a7b6432885970d03e\``);
        await queryRunner.query(`ALTER TABLE \`application_process\` DROP FOREIGN KEY \`FK_cbb645fb502a0a1b6515d854312\``);
        await queryRunner.query(`ALTER TABLE \`application_fee\` DROP FOREIGN KEY \`FK_dd052e17e3620318022708bb80a\``);
        await queryRunner.query(`ALTER TABLE \`suspension\` DROP FOREIGN KEY \`FK_e3fc77bd6d60c67bdc4fc981019\``);
        await queryRunner.query(`ALTER TABLE \`expulsion\` DROP FOREIGN KEY \`FK_88695a60fc756c7d19ec85ebee6\``);
        await queryRunner.query(`ALTER TABLE \`membership_fee\` DROP FOREIGN KEY \`FK_ff4eea3b86bceb3a7036dc502de\``);
        await queryRunner.query(`ALTER TABLE \`section\` DROP FOREIGN KEY \`FK_9f961c619507c4d6276251445c8\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_3a0b4db0ebe5e37bc9b09c4129c\``);
        await queryRunner.query(`DROP TABLE \`recommendation\``);
        await queryRunner.query(`DROP TABLE \`applicant\``);
        await queryRunner.query(`DROP TABLE \`application_status\``);
        await queryRunner.query(`DROP TABLE \`application_process\``);
        await queryRunner.query(`DROP TABLE \`application_fee\``);
        await queryRunner.query(`DROP TABLE \`suspension\``);
        await queryRunner.query(`DROP INDEX \`IDX_6f1d86a57bbcd35c684c23be72\` ON \`member\``);
        await queryRunner.query(`DROP TABLE \`member\``);
        await queryRunner.query(`DROP TABLE \`expulsion\``);
        await queryRunner.query(`DROP TABLE \`membership_fee\``);
        await queryRunner.query(`DROP TABLE \`fee\``);
        await queryRunner.query(`DROP INDEX \`IDX_1471a598e418e1b2e1cfd0f9d1\` ON \`identifier\``);
        await queryRunner.query(`DROP TABLE \`identifier\``);
        await queryRunner.query(`DROP TABLE \`application_feature\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP INDEX \`IDX_3a08a1120590b23c33bbbc45e1\` ON \`section\``);
        await queryRunner.query(`DROP TABLE \`section\``);
        await queryRunner.query(`DROP INDEX \`IDX_0ab85f4be07b22d79906671d72\` ON \`article\``);
        await queryRunner.query(`DROP TABLE \`article\``);
    }

}
