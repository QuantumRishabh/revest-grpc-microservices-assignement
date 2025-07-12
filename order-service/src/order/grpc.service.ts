import { Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PRODUCT_SERVICE_NAME,
  ProductServiceClient
} from '../grpc-proto/product.pb';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class GRPCService implements OnModuleInit {
  private productClient: ProductServiceClient;
  constructor(
    @Inject(PRODUCT_SERVICE_NAME) private readonly client: ClientGrpc,

  ) { }

  onModuleInit() {
    this.productClient = this.client.getService<ProductServiceClient>('ProductService');
  }

  async pingProductService() {
    const res = await lastValueFrom(this.productClient.ping({}));
    return res;
  }

  async getProductByName(productName: any): Promise<any> {
    const product = await lastValueFrom(
      this.productClient.getProductByName({ name: productName }),
    );
    console.log("prodcuttt", product)
    if (product.isDeleted) {
      throw new NotFoundException('Product not found or inactive');
    }
    return product;
  }

}
