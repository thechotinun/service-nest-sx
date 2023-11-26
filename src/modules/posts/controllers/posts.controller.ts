import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginateQuery } from '@common/dto/paginate.query';
import { PostsService } from '@modules/posts/services/posts.service';
import { ApiResource } from '@common/reponses/api-resource';
import { UseResources } from 'interceptors/use-resources.interceptor';
import { PostsResourceDto } from '@modules/posts/resources/posts.resource';
import { MyLogger } from '@common/logger/mylogger.service';

@Controller('api/v1/posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly myLogger: MyLogger,
  ) {}

  @Get()
  @UseResources(PostsResourceDto)
  async paginate(
    @Query() { page, limit }: PaginateQuery,
  ): Promise<ApiResource> {
    try {
      this.myLogger.debug(`This Logging is debug`);
      const reponse = await this.postsService.paginate({
        page,
        limit,
      });
      return ApiResource.successResponse(reponse);
    } catch (error) {
      this.myLogger.error(`This Logging is error`, error);
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
