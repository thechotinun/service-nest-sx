import { MigrationInterface, QueryRunner } from 'typeorm';
import { Posts } from '../entities/posts.entity';
import { PostsSeed } from './seeds/posts.seed';
import { User } from '../entities/user.entity';
import { UserSeed } from './seeds/user.seed';

export class PostsTable1700882941841 implements MigrationInterface {
  name = 'PostsTable1700882941841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        role VARCHAR(100) NOT NULL);`,
    );
    await queryRunner.query(
      `CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        "postedAt" TIMESTAMP NOT NULL,
        "postedBy" VARCHAR(255) NOT NULL,
        tags TEXT[]);`,
    );
    const userEntity = queryRunner.manager.create<User>(User, UserSeed);
    await Promise.all(userEntity);
    await queryRunner.manager.save(userEntity);
    const postEntity = queryRunner.manager.create<Posts>(Posts, PostsSeed);
    await Promise.all(postEntity);
    await queryRunner.manager.save(postEntity);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
