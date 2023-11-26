import { MigrationInterface, QueryRunner } from 'typeorm';
import { Posts } from '../entities/posts-entity';
import { PostsSeed } from './seeds/posts.seed';

export class PostsTable1700882941841 implements MigrationInterface {
  name = 'PostsTable1700882941841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        "postedAt" TIMESTAMP NOT NULL,
        "postedBy" VARCHAR(255) NOT NULL,
        tags TEXT[]);`,
    );
    const postEntity = queryRunner.manager.create<Posts>(Posts, PostsSeed);
    await Promise.all(postEntity);
    await queryRunner.manager.save(postEntity);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
