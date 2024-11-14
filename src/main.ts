import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation with ValidationPipe
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

    // Enable API versioning
    app.enableVersioning({
      type: VersioningType.URI,  // URI-based versioning (e.g., /v1/todos)
    });

  await app.listen(3000);
}
bootstrap();
