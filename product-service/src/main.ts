import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import helmet from "helmet";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT') || 5000; // HTTP
  const path = configService.get<string>('SERVICE_PATH') || 'api';

  // Start gRPC server
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../grpc-proto/product.proto'),
      package: 'product',
      url: '0.0.0.0:50051',
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.setGlobalPrefix(path);
  app.enableCors();

  // Start both servers
  await app.startAllMicroservices();
  await app.listen(port, () => {
    console.log('\n🎉 ========================================');
    console.log('🎉 PRODUCT SERVICE STARTED SUCCESSFULLY'); // ✅ Fix here
    console.log('🎉 ========================================');
    console.log(`🌐 Server is listening on port ${port}`);
  });
}

bootstrap()