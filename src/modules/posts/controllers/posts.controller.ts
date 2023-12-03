import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PaginateQuery } from '@common/dto/paginate.query';
import { PostsService } from '@modules/posts/services/posts.service';
import { ApiResource } from '@common/reponses/api-resource';
import { UseResources } from 'interceptors/use-resources.interceptor';
import { PostsResourceDto } from '@modules/posts/resources/posts.resource';
import { MyLogger } from '@common/logger/mylogger.service';
import { BackendAuthGuard } from '@common/guards/backend-auth.guard';
import { Roles } from '@common/decorators/roles.decorator';

@UseGuards(BackendAuthGuard)
@Controller('api/v1/posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly myLogger: MyLogger,
  ) {}

  @Get()
  @Roles('admin')
  @UseResources(PostsResourceDto)
  async paginate(
    @Query()
    query: {
      title: string;
      postedBy: string;
      tags: string[];
      postedAt: string;
    },
    @Query() { page, limit }: PaginateQuery,
  ): Promise<ApiResource> {
    try {
      const reponse = await this.postsService.paginate(
        {
          page,
          limit,
        },
        query,
      );
      return ApiResource.successResponse(reponse);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<ApiResource> {
    try {
      const response = await this.postsService.findOneById(id);

      return ApiResource.successResponse(response);
    } catch (error) {
      return ApiResource.errorResponse(error);
    }
  }
}
