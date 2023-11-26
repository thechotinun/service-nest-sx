import { Module } from '@nestjs/common';
import { PostsRepository } from '@repositories/posts.repository';
import { MyLogger } from '@common/logger/mylogger.service';
import { AuthModule } from '@modules/auth/auth.module';
import { PostsController as BackendPostsController } from './controllers/posts.controller';
import { PostsService as BackendPostsService } from './services/posts.service';

@Module({
  imports: [AuthModule],
  controllers: [BackendPostsController],
  providers: [BackendPostsService, PostsRepository, MyLogger],
})
export class PostsModule {}
