import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialSchema1754481733677 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
