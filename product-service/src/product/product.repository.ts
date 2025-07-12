import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ProductPrisma {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    createProduct(dto: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.prisma.product.create({ data: dto })
                .then(product => resolve(product))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }

    checkProductExists(name: string): Promise<any> { 
        return new Promise((resolve, reject) => {
            this.prisma.product.findFirst({
                where: { name, isDeleted: false },
            })
                .then(product => resolve(product))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.prisma.product.findMany({
                where: { isDeleted: false },
                orderBy: { createdAt: 'desc' },
            })
                .then(products => resolve(products))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }

    findById(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.prisma.product.findUnique({
                where: { id },
            })
                .then(product => resolve(product))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.prisma.product.update({
                where: { id },
                data: {
                    ...data,
                    updatedAt: new Date(),
                },
            })
                .then(updated => resolve(updated))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }

    deleteProduct(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.prisma.product.update({
                where: { id },
                data: {
                    isDeleted: true,
                    updatedAt: new Date(),
                },
            })
                .then(deleted => resolve(deleted))
                .catch(error => reject(error))
                .finally(() => this.prisma.$disconnect());
        });
    }
}
