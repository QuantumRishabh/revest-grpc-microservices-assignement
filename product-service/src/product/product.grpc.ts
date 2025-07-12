import {
  ProductServiceController,
  ProductServiceControllerMethods,
  GetProductByNameRequest,
  PingRequest,
  PingResponse
} from '../grpc-proto/product.pb';
import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
@ProductServiceControllerMethods()
export class ProductGrpcController implements ProductServiceController {
  constructor(private readonly productService: ProductService) {}

  async getProductByName(request: GetProductByNameRequest): Promise<any> {
    console.log("requesss",request)
    const product = await this.productService.findByName(request.name);
      console.log("product",product)
    if (!product) {
      throw new Error(`Product ${request.name} not found`);
    }
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      isDeleted: product.isDeleted,
    };
  }

  // ✅ Add this method
  ping(request: PingRequest): PingResponse {
    console.log('✅ Ping received from Order Service');
    return { message: 'pong from product-service' };
  }
}
