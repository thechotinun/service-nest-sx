import { Posts } from '@entities/posts.entity';
import { PostsException } from '@exceptions/app/posts.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from '@repositories/posts.repository';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private readonly postsRepository: PostsRepository,
  ) {}

  async paginate(
    options: IPaginationOptions,
    query: {
      title: string;
      postedBy: string;
      tags: string[];
      postedAt: string;
    },
  ): Promise<Pagination<Posts>> {
    const { title, postedBy, tags, postedAt } = query;
    const checkTags = Array.isArray(tags);

    const queryBuilder = this.postsRepository
      .createQueryBuilder('posts')
      .orderBy('posts.postedAt', postedAt as 'DESC' | 'ASC');

    title && queryBuilder.andWhere({ title: Like(`%${title}%`) });
    postedBy && queryBuilder.andWhere({ postedBy: Like(`%${postedBy}%`) });
    tags &&
      queryBuilder.andWhere('posts.tags IN (:tags)', {
        tags: checkTags ? tags : [tags],
      });

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
