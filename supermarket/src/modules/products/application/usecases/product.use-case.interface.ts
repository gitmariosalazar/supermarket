import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';

export interface InterfaceUseCaseProduct {
  findAllProducts(): ProductResponse[];
  findProductByCode(code: string): ProductResponse | null;
  createProduct(productRequest: ProductRequest): ProductResponse | null;
  updateProduct(
    code: string,
    productRequest: ProductRequest
  ): ProductResponse | null;
}
