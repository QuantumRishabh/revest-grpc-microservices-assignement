import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(dto: CreateOrderDto, product: any): Promise<any> {
    const totalAmount = product.price * dto.quantity;

    return this.orderRepository.createOrder({
      productId: product.id,
      quantity: dto.quantity,
      totalAmount,
    });
  }

  async findAll(): Promise<any> {
    return this.orderRepository.findAll();
  }

  async findById(id: string): Promise<any> {
    const order = await this.orderRepository.findById(id);
    if (!order || order.isDeleted) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: string, dto: UpdateOrderDto): Promise<any> {
    await this.findById(id);
    return this.orderRepository.updateOrder(id, dto);
  }

  async delete(id: string): Promise<any> {
    await this.findById(id);
    return this.orderRepository.deleteOrder(id);
  }
}
