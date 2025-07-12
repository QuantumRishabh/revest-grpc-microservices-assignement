import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from '../grpc-proto/product.pb';
import { OrderController } from './order.controller';
import { GRPCService } from './grpc.service';
import { OrderRepository } from './order.repository';
import { PrismaService } from '../prisma/prisma.service'; // ✅ FIX this import if incorrect
import { OrderService } from './order.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051', // must match the gRPC server in product service
          package: PRODUCT_PACKAGE_NAME,
          protoPath: join(__dirname, '../../grpc-proto/product.proto'),
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService,GRPCService, OrderRepository, PrismaService],
})
export class OrderModule {}
