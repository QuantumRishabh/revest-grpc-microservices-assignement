import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    PrismaModule,
    OrderModule, 
  ], 
})
export class AppModule {}
