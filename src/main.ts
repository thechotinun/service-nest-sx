import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from '@common/logger/mylogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.useLogger(app.get(MyLogger));
  app.enableCors({
    origin: [configService.get<string>('APP_URL')],
    methods: 'GET, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const isDevelopmentMode =
    configService.get<'test' | 'develop' | 'production'>('mode') !==
    'production';

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  if (isDevelopmentMode) {
    SwaggerModule.setup(
      'swagger',
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder().setTitle('SkinX').setVersion('1.0').build(),
      ),
      { useGlobalPrefix: true },
    );
  }

  await app.listen(configService.get<number>('port'));
}
bootstrap();
