import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOrder(data: any): Promise<any> {
      console.log("totalAmount",data)
  return new Promise((resolve, reject) => {
    this.prisma.order
      .create({
        data: {
          productId: data.productId,
          quantity: data.quantity,
          totalAmount: data.totalAmount,
        },
      })
      .then(order => resolve(order))
      .catch(err => reject(err))
      .finally(() => this.prisma.$disconnect());
  });
}


  findAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.prisma.order
        .findMany({ where: { isDeleted: false } })
        .then(orders => resolve(orders))
        .catch(err => reject(err))
        .finally(() => this.prisma.$disconnect());
    });
  }

  findById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.prisma.order
        .findUnique({ where: { id } })
        .then(order => resolve(order))
        .catch(err => reject(err))
        .finally(() => this.prisma.$disconnect());
    });
  }

  updateOrder(id: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.prisma.order
        .update({ where: { id }, data })
        .then(order => resolve(order))
        .catch(err => reject(err))
        .finally(() => this.prisma.$disconnect());
    });
  }

  deleteOrder(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.prisma.order
        .update({
          where: { id },
          data: { isDeleted: true },
        })
        .then(order => resolve(order))
        .catch(err => reject(err))
        .finally(() => this.prisma.$disconnect());
    });
  }

}
