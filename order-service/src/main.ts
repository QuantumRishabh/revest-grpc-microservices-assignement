import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT');
  const path = configService.get<string>('SERVICE_PATH');

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.setGlobalPrefix(path);
  app.enableCors();

  await app.listen(port, () => {
    console.log('\n🎉 ========================================');
    console.log('🎉 ORDER SERVICE STARTED SUCCESSFULLY');
    console.log('🎉 ========================================');
    console.log(`🌐 Server is listening on port ${port}`);
  });
}
bootstrap();
