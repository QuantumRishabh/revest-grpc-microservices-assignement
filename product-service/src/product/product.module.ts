import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { PrismaModule } from '../prisma/prisma.module';
import { ProductPrisma } from './product.repository';
import { ProductGrpcController } from './product.grpc';

@Module({
  imports: [PrismaModule],
  providers: [ProductService, ProductPrisma], 
  controllers: [ProductController,ProductGrpcController],
  exports: [ProductPrisma], 
})
export class ProductModule {}
