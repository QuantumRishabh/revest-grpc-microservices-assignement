import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductPrisma } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productPrisma: ProductPrisma
  ) { }

  async createProduct(dto: CreateProductDto): Promise<any> {
    const existing = await this.productPrisma.checkProductExists(dto.name);
    if (existing) {
      throw new ConflictException('Product already exists');
    }

    const product = await this.productPrisma.createProduct(dto);
    return {
      id: product.id,
      message: 'Product added successfully',
      data: product
    };
  }

  async getAllProducts(): Promise<any> {
    return this.productPrisma.findAll();
  }

  async getProductById(id: string): Promise<any> {
    return this.productPrisma.findById(id);
  }

   async updateProduct(id: string, dto: UpdateProductDto): Promise<any> {
    const existing = await this.productPrisma.findById(id);
    if (!existing || existing.isDeleted) {
      return null;
    }

    return this.productPrisma.update(id, dto);
  }

  async deleteProduct(id: string): Promise<boolean> {
    const product = await this.productPrisma.findById(id);
    if (!product || product.isDeleted) {
      return false;
    }

    await this.productPrisma.deleteProduct(id);
    return product;
  }


  async findByName(name: string) {
    const product =  await this.productPrisma.checkProductExists(name);
    console.log("product",product)
    return product
  }
}
