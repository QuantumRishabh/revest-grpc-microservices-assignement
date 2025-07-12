import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { GRPCService } from './grpc.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderService: OrderService,
    private readonly grpcService: GRPCService // only used for gRPC ping or external calls
  ) {}

  @Get('ping-product')
  async ping() {
    const res = await this.grpcService.pingProductService();
    return {
      statusCode: HttpStatus.OK,
      message: 'Ping successful',
      data: res,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateOrderDto) {
    // You can fetch product data via gRPC here if needed:
    const product = await this.grpcService.getProductByName(dto.productName);

    if (!product || product.isDeleted) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product not found or inactive',
      };
    }

    const totalAmount = product.price * dto.quantity;

   const order = await this.orderService.createOrder(dto, product);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Order created successfully',
      data: order,
    };
  }

  @Get()
  async getAll() {
    const orders = await this.orderRepository.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Orders fetched successfully',
      data: orders,
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const order = await this.orderRepository.findById(id);
    if (!order || order.isDeleted) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Order not found',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Order fetched successfully',
      data: order,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    const order = await this.orderRepository.findById(id);
    if (!order || order.isDeleted) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Order not found',
      };
    }

    const updated = await this.orderRepository.updateOrder(id, dto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order updated successfully',
      data: updated,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const order = await this.orderRepository.findById(id);
    if (!order || order.isDeleted) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Order not found',
      };
    }

    await this.orderRepository.deleteOrder(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order deleted successfully',
    };
  }
}
