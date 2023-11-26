import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Posts } from '@entities/posts.entity';

@Injectable()
export class PostsRepository extends BaseRepository<Posts> {
  constructor(private dataSource: DataSource) {
    super(Posts, dataSource.createEntityManager());
  }
}
