import { ProductRequest } from '../../domain/schemas/dto/request/product.request';
import { ProductResponse } from '../../domain/schemas/dto/response/product.response';

export interface InterfaceUseCaseProduct {
  findAllProducts(): Promise<ProductResponse[]>;
  findProductByCode(code: string): Promise<ProductResponse | null>;
  createProduct(
    productRequest: ProductRequest
  ): Promise<ProductResponse | null>;
  updateProduct(
    code: string,
    productRequest: ProductRequest
  ): Promise<ProductResponse | null>;
  findProductWarningStock(): Promise<ProductResponse[]>;
  findProductsBetweenStock(
    startStock: number,
    endStock: number
  ): Promise<ProductResponse[]>;
  findProductsByCategoryName(categoryName: string): Promise<ProductResponse[]>;
  findUnpurchasedProducts(): Promise<ProductResponse[]>;
  findPurchasedProducts(): Promise<ProductResponse[]>;
}
