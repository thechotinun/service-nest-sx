import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Posts } from './src/entities/posts.entity';
import { PostsTable1700882941841 } from './src/migrations/1700882941841-posts-table';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [Posts],
  migrations: [PostsTable1700882941841],
  synchronize: configService.get<boolean>('DATABASE_SYNC'),
});
