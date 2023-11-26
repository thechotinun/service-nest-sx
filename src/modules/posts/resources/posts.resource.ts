import { BaseResourceDto } from '@common/resources/base.resource';
import { ResourceWithPaginateDto } from '@common/resources/paginate.resource';
import { Expose, Type } from 'class-transformer';

export class PostsDto extends BaseResourceDto {
  @Expose()
  title: string;

  @Expose()
  postedAt: Date;

  @Expose()
  postedBy: string;

  @Expose()
  tags: string[];
}

export class PostsResourceDto extends ResourceWithPaginateDto {
  @Expose()
  @Type(() => PostsDto)
  data: PostsDto;
}
