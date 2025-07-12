import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
@Injectable()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProductDto): Promise<any> {
    const product = await this.productService.createProduct(dto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created successfully',
      data: product,
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @Get('')
  async getAll(): Promise<any> {
    const products = await this.productService.getAllProducts();
    return {
      statusCode: HttpStatus.OK,
      message: 'Product list fetched successfully',
      data: products,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<any> {
    const updated = await this.productService.updateProduct(id, dto);
    if (!updated) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data: updated,
    };
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<any> {
    const deleted = await this.productService.deleteProduct(id);

    if (!deleted) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Product deleted successfully',
      data: deleted,
    };
  }
}
