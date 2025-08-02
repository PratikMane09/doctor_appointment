import { MigrationInterface, QueryRunner } from "typeorm";
export declare class InitialSchema1754162907305 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
