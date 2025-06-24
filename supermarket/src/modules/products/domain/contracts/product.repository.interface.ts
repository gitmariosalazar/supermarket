import { ProductResponse } from '../schemas/dto/response/product.response';
import { ProductModel } from '../schemas/model/product.model';

export interface InterfaceProductRepository {
  findAllProducts(): Promise<ProductResponse[]>;
  findProductByCode(code: string): Promise<ProductResponse | null>;
  createProduct(productModel: ProductModel): Promise<ProductResponse | null>;
  updateProduct(
    code: string,
    productModel: ProductModel
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
