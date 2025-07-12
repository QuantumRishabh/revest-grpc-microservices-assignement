import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  INestApplication,
  Scope,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable({scope:Scope.REQUEST})
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
