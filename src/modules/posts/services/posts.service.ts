import { Posts } from '@entities/posts-entity';
import { PostsException } from '@exceptions/app/posts.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from '@repositories/posts.repository';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private readonly postsRepository: PostsRepository,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Posts>> {
    const queryBuilder = this.postsRepository
      .createQueryBuilder('posts')
      .orderBy('posts.postedAt', 'DESC');

    return paginate<Posts>(queryBuilder, options);
  }

  async findOneById(id: number): Promise<Posts> {
    return await this.postsRepository
      .findOneOrFail({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw PostsException.notFound();
      });
  }
}
